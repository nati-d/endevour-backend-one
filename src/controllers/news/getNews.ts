import prisma from "../../prisma/index";
import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import Validator from "../../validation/index";

export default async (req: Request, res: Response) => {

    try {
        const { error } = Validator.news.getNews.validate(req.body);

        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details,
                data: null,
            });
        }
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Error at request validation",
            data: error,
        });
    }

    try {
        const newNews = await prisma.client.news.findMany({
            where: {
                id: req.body.id,
                title: req.body.title,
                created_at: {
                    gte: req.body?.date?.lower_bound,
                    lte: req.body?.date?.upper_bound
                },
                tags: { some: { id: { in: req.body.tags } } }
            },
            include: {
                tags: {
                    select: {
                        id: true
                    }
                }
            }
        });

        res.status(201).json({
            success: true,
            message: "News created successfully",
            data: newNews
        });

    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2022") {
            return res.status(400).json({
                success: false,
                message: 'Not authorized to post news',
                data: error,
            });
        }

        console.error("Error while posting news:", error);
        return res.status(500).json({
            success: false,
            message: "Error while posting news",
            data: error,
        });
    }
};
