import prisma from "../../prisma/index";
import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import Validator from "../../validation/index";
import ApiResponse from "../../types/response";

export default async (req: Request, res: Response) => {
    try {
        const { error } = Validator.news.createNews.validate(req.body);

        if (error) {
            return res.status(400).json(new ApiResponse(false, "unidentified request content", error.details));
        }
    } catch (error) {
        return res.status(400).json(new ApiResponse(false, "Error at request validation"));
    }

    try {
        const newNews = await prisma.client.news.create({
            data: {
                title: req.body.title,
                overview: req.body.overview,
                thumbnail: req.body.thumbnail,
                body: req.body.body,
                posted_by: req.auth?.id,
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

        res.status(201).json(new ApiResponse(true, "news created successfully", newNews));

    } catch (error) {

        console.log(error);

        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2022") {
                return res.status(400).json(new ApiResponse(false, "not authorized to post news", error));
            }
        }

        return res.status(500).json(new ApiResponse(false, "Error while posting news"));
    }
};
