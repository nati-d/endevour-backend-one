import prisma from "../../prisma/index";
import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import Validator from "../../validation/index";
import ApiResponse from "../../types/response";

export default async (req: Request, res: Response) => {
    const { error } = Validator.blog.updateBlog.validate(req.body);

    if (error) {
        return res.status(400).json(new ApiResponse(false, "unidentified request content", error.details));
    }

    try {
        let blog: any;
        if (req.auth?.role == "ADMIN" || req.auth?.role == "SUPER_ADMIN")
        blog = await prisma.client.blog.update({
            where: {
                id: req.body.id
            },
            data: {
                verified_by: req.body.verify ? req.auth?.id : req.body.verify == false ? null : undefined,
                tags: {
                    connectOrCreate: req.body.tags.map((name: string) => ({
                        where: { name },
                        create: { name }
                    })),
                    disconnect: req.body.tags_to_remove.map((name: string) => ({ name })),
                }
            },
            include: { tags: { select: { name: true } } },
        });

            const blogToBeUpdated = await prisma.client.blog.findFirst({ where: { id: req.body.id } } );

            if(blogToBeUpdated?.posted_by != req.auth?.id)
            return res.status(403).json(new ApiResponse(false, "unable to update blog due to ownership of the post!"));

            blog = await prisma.client.blog.update({
                where: {
                    id: req.body.id,
                },
                data: {
                    title: req.body.title,
                    overview: req.body.overview,
                    body: req.body.body,
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

        res.status(200).json(new ApiResponse(true, "new blog updated successfully", blog));

    } catch (error) {

        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if ( error.code === "P2022" )
            return res.status(403).json(new ApiResponse(false, "not authorized to update blogs", error));

            if ( error.code === "P2016" )
            return res.status(404).json(new ApiResponse(false, "resource to be updated not found", error));
        }

        res.status(500).json(new ApiResponse(false, "error while updating blog"));
    }

}
