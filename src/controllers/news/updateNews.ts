import prisma from "../../prisma/index";
import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import Validator from "../../validation/index";
import ApiResponse from "../../types/response";

export default async (req: Request, res: Response) => {

    const { error } = Validator.news.updateNews.validate(req.body);

    if (error)
        return res.status(400).json(new ApiResponse(false, "unidentified request content", error.details));

    try {

        const newNews = await prisma.client.news.update({
            where: {
                id: req.body.id
            },
            data: {
                title: req.body.title,
                overview: req.body.overview,
                thumbnail: req.body.thumbnail,
                body: req.body.body,
                posted_by: req.auth?.id as number,
                tags: {
                    connectOrCreate: req.body.tags.map((name: string) => ({
                        where: { name },
                        create: { name }
                    })),
                    disconnect: req.body.tags_to_remove.map((name: string) => ({ name })),
                },
            }, include: {
                tags: { select: { name: true } }
            }
        });

        res.status(200).json(new ApiResponse(true, "News updated successfully", newNews));

    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            return res.status(400).json(new ApiResponse(false, 'error while updating news', error));
        }

        return res.status(500).json(new ApiResponse(false, "Error while posting news"));
    }
};
