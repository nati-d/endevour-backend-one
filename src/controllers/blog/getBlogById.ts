import prisma from "../../prisma/index";
import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import _, { parseInt } from "lodash";
import ApiResponse from "../../types/response";

export default async (req: Request, res: Response) => {
    try {
        let id = parseInt(req.query.id as string) || req.body.id;

        let blog: any;

        blog = await prisma.client.blog.findFirst({
            where : { id },
            include: { tags: { select: { name: true } } } }
        )

        if (blog)
        return res.status(200).json(new ApiResponse(true, "blog fetched successfully", blog))
        else
        return res.status(204).json(new ApiResponse(false, "blog does not exit", blog))
    } catch (error) {
        console.error(error);

        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2022")
            return res.status(403).json(new ApiResponse(false, "not authorized to get blogs"))
        }

        return res.status(400).json(new ApiResponse(false, "error while getting blog"));
    }

}
