import prisma from "../../prisma/index";
import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import Validator from "../../validation/index";

export default async (req: Request, res: Response) => {
    try {
        const { error } = Validator.news.createNews.validate(req.body);

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
        const newNews = await prisma.client.news.create({
            data: {
                title: req.body.title,
                overview: req.body.overview,
                body: req.body.body,
                posted_by: req.auth?.id as number,
                tags: {
                    connectOrCreate: req.body.tags.map((id: string) => ({
                        where: { id },
                        create: { id }
                    }))
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
