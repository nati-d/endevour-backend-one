import prisma from "../../prisma/index";
import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import _, { parseInt } from "lodash";
import ApiResponse from "../../types/response";

export default async (req: Request, res: Response) => {
  try {
    let id = parseInt(req.query.id as string) || req.body.id;

    let news: any;

    news = await prisma.client.news.findFirst({
      where : { id },
      include: {
        tags: { select: { name: true } },
        admin: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            email: false,
            phone_number: false,
            password: false,
            role: false,
            profile_image: true,
            created_at: false,
            updated_at: false,
          }
        }
      }
    })

    if (news)
    return res.status(200).json(new ApiResponse(true, "news fetched successfully", news))
    else
    return res.status(204).json(new ApiResponse(false, "news does not exit", news))
  } catch (error) {
    console.error(error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2022")
      return res.status(403).json(new ApiResponse(false, "not authorized to get news"))
    }

    return res.status(400).json(new ApiResponse(false, "error while getting news"));
  }

}
