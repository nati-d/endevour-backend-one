import prisma from "../../prisma/index";
import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import Validator from "../../validation/index";
import ApiResponse from "../../types/response";

export default async (req: Request, res: Response) => {
    try {
        const { error } = Validator.blog.deleteBlog.validate(req.body);

        if (error) {
            return res.status(400).json(new ApiResponse(false, "unidentified request content", error.details));
        }
    } catch (error) {
        return res.status(400).json(new ApiResponse(false, "error at validating request"));
    }

    try {
        let newBlog: any;
        if (req.auth?.role == "ADMIN" || req.auth?.role == "SUPER_ADMIN")
        newBlog = await prisma.client.blog.delete({
            where: { id: req.body.id },
        });

        else
        newBlog = await prisma.client.blog.delete({
             where: { id: req.body.id },
        });

        res.status(201).json(new ApiResponse(true, "blog deleted successfully", newBlog));

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
