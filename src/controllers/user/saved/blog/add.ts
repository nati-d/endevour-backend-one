import { Request, Response } from 'express';
import prisma from '../../../../prisma/'
import { Prisma } from "@prisma/client";
import ApiResponse from '../../../../types/response';

export default async (req: Request, res: Response) => {
    try {
        let saved = await prisma.client.saved_blog.create({
            data: {
                user: req.auth.id,
                blog: req.body.id
            },
            include: {
                user_: {
                    select: {
                        id: true,
                        first_name: true,
                        last_name: true,
                        email: true,
                        phone_number: true,
                        profile_image: true,
                        location: true,
                    }
                },
                blog_: {
                    select: {
                        id: true,
                        title: true,
                        overview: true,
                        body: true,
                        posted_by: true,
                        verified_by: true,
                    }
                }
            }
        });

        return res.status(201).json(new ApiResponse(true, "data saved successfully", saved));
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
