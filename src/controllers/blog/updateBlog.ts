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
                    connectOrCreate: req.body.tags.map((id: string) => ({
                        where: { id },
                        create: { id }
                    })),
                    disconnect: req.body.tags_to_remove.map((id: string) => ({ id })),
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
                    connectOrCreate: req.body.tags.map((id: string) => ({
                        where: { id },
                        create: { id }
                    })),
                    disconnect: req.body.tags_to_remove.map((id: string) => ({ id })),
                }
            }
        });

        res.status(201).json(new ApiResponse(true, "new blog created successfully", newBlog));

    } catch (error) {
        if (
            error instanceof Prisma.PrismaClientKnownRequestError &&
                error.code === "P2022"
        ) {
            return res.status(400).json(new ApiResponse(false, "not authorized to post blogs"));
        }

        res.status(400).json(new ApiResponse(false, "error while creating blog"));
    }

}
