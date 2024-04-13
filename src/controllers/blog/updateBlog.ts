import prisma from "../../prisma/index";
import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import Validator from "../../validation/index";
import ApiResponse from "../../types/response";

export default async (req: Request, res: Response) => {
    try {
        const { error } = Validator.blog.updateBlog.validate(req.body);

        if (error) {
            return res.status(400).json(new ApiResponse(false, "unidentified request content", error.details));
        }
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Error at request validation",
            data: error,
        });
    }

    try {
        let newBlog: any;
        if (req.auth?.role == "ADMIN" || req.auth?.role == "SUPER_ADMIN")
        newBlog = await prisma.client.blog.update({
            where: {
                id: req.body.id
            },
            data: {
                title: req.body.title,
                overview: req.body.overview,
                body: req.body.body,
                verified_by: req.auth?.id as number,
                tags: {
                    connectOrCreate: req.body.tags.map((name: string) => ({
                        where: { name },
                        create: { name }
                    })),
                    disconnect: req.body.tags_to_remove.map((name: string) => ({ name })),
                }
            }
        });

        else
        newBlog = await prisma.client.blog.update({
            where: {
                id: req.body.id,
            },
            data: {
                title: req.body.title,
                overview: req.body.overview,
                body: req.body.body,
                posted_by: req.auth?.id as number,
                tags: {
                    connectOrCreate: req.body.tags.map((name: string) => ({
                        where: { name },
                        create: { name }
                    })),
                     disconnect: req.body.tags_to_remove.map((name: string) => ({ name })),
                }
            },
            include: { tags: { select: { name: true } } }
        });

        res.status(200).json(new ApiResponse(true, "new blog created successfully", newBlog));

    } catch (error) {
        console.error(error);

        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if ( error.code === "P2022" )
                return res.status(403).json(new ApiResponse(false, "not authorized to post blogs", error));

            if ( error.code === "P2016" )
                return res.status(404).json(new ApiResponse(false, "resource to be updated not found", error));
        }

        res.status(500).json(new ApiResponse(false, "error while creating blog"));
    }

}
