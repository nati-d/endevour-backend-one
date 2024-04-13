import prisma from "../../prisma/index";
import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import Validator from "../../validation/index";
import ApiResponse from "../../types/response";

export default async (req: Request, res: Response) => {

    const { error } = Validator.news.getNews.validate(req.body);

    if (error)
    return res.status(400).json(new ApiResponse(false, "unidentified request content", error.details));

    try {
        let news: any;
        let totalPages: number = 0;
        let page: number = req.body.page ? ( req.body.page - 1) * 10 : 0;

        news = await prisma.client.news.findMany({
            take: 10,
            skip: page,
            where: {
                id: req.body.id,
                title: req.body.title,
                created_at: {
                    gte: req.body?.date?.lower_bound,
                    lte: req.body?.date?.upper_bound,
                },
                tags: req.body.tags && req.body.tags.length > 0 ? { some: { name: { in: req.body.tags } } } : {}
            },
            include: {
                tags: {
                    select: {
                        name: true,
                    },
                },
            },
        });

        totalPages = await prisma.client.news.count({
            where: {
                id: req.body.id,
                title: req.body.title,
                created_at: {
                    gte: req.body?.date?.lower_bound,
                    lte: req.body?.date?.upper_bound,
                },
                tags: req.body.tags && req.body.tags.length > 0 ? { some: { name: { in: req.body.tags } } } : {}
            }
        })

        res.status(200).json(new ApiResponse(true, "News getted successfully", { news: news, total_pages: totalPages }));

    } catch (error) {

        console.error("Error while posting news:", error);

        if ( error instanceof Prisma.PrismaClientKnownRequestError ) {
            if ( error.code === "P2022" )
            return res.status(400).json(new ApiResponse(false, "Not authorized to post news", error));
        }

        return res.status(500).json(new ApiResponse(false, "Error while posting news", error));
    }
};
