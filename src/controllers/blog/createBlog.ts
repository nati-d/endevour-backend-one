import prisma from "../../prisma/index";
import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import Validator from "../../validation/index";
import ApiResponse from "../../types/response";

export default async (req: Request, res: Response) => {
    console.log(req.userAuth)
    try {
        const { error } = Validator.blog.createBlog.validate(req.body);

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
        newBlog = await prisma.client.blog.create({
            data: {
                title: req.body.title,
                overview: req.body.overview,
                body: req.body.body,
                verified_by: req.auth?.id as number,
                posted_by: req.userAuth?.id as number,
                tags: {
                    connectOrCreate: req.body.tags.map((name: string) => ({
                        where: { name },
                        create: { name }
                    }))
                }
            },
            include: {
                tags: { select: { name: true } }
            }
        });

        res.status(201).json(new ApiResponse(true, "new blog created successfully", newBlog));

    } catch (error) {
        console.log(error);

        if (
            error instanceof Prisma.PrismaClientKnownRequestError &&
                error.code === "P2022"
        ) {
            return res.status(400).json(new ApiResponse(false, "not authorized to post blogs"));
        }

        res.status(400).json(new ApiResponse(false, "error while creating blog", error));
    }

}
