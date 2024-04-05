import prisma from "../../prisma/index";
import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import Validator from "../../validation/index";

export default async (req: Request, res: Response) => {

    const { error } = Validator.news.deleteNews.validate(req.body);

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details,
            data: null,
        });
    }

    try {
        const newNews = await prisma.client.news.delete({
            where: {
                id: req.body.id
            }
        });

        res.status(201).json({
            success: true,
            message: "News deleted successfully",
            data: newNews
        });

    } catch (error) {

        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            return res.status(400).json({
                success: false,
                message: 'error while deleting news',
                data: error,
            });
        }

        return res.status(500).json({
            success: false,
            message: "Error while posting news",
            data: error,
        });
    }
}
