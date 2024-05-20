import { Request, Response, NextFunction } from 'express';
import prisma from '../../../../prisma/'
import { Prisma } from "@prisma/client";
import ApiResponse from '../../../../types/response';

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    let saved = await prisma.client.procurement.upsert({
      where: {
        user_service_provider: {
          user: req.auth.id,
          service_provider: req.body.id
        }
      },
      update: {

      },
      create: {
        user: req.auth.id, service_provider: req.body.id
      },
      include: {
        user_: {
          select: {
            id: false,
            username: true,
            first_name: true,
            last_name: true,
            email: true,
            phone_number: false,
            password: false,
            profile_image: false,
            location: false,
            verified_by: false,
            token: false,
            is_recommender: false,
            created_at: false,
            updated_at: false
          }
        },
        service_provider_: {
          select: {
            id: false,
            name: true,
            phone: false,
            email: true,
            about: true,
            verified_by: false,
            service_category: true,
            password: false,
            created_at: false,
            updated_at: false
          }
        }
      }
    });


    req.emailData = {
      sendTo: req.auth?.email,
      subject: "subject",
      html: "html"
    }
    // res.status(201).json(new ApiResponse(true, "data saved successfully", saved));
    next();
  } catch(error) {
    console.error(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code == 'P2002')
      return res.status(409).json(new ApiResponse(false, "content already saved"));

      if (error.code == 'P2003')
      return res.status(404).json(new ApiResponse(false, "resource to be saved does not exist"))
    }
    return res.status(500).json(new ApiResponse(false, "error while processing request"));
  }
}
