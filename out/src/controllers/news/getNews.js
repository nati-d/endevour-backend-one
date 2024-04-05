"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../../prisma/index"));
const client_1 = require("@prisma/client");
const index_2 = __importDefault(require("../../validation/index"));
exports.default = async (req, res) => {
    try {
        const { error } = index_2.default.news.getNews.validate(req.body);
        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details,
                data: null,
            });
        }
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: "Error at request validation",
            data: error,
        });
    }
    try {
        const newNews = await index_1.default.client.news.findMany({
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
    }
    catch (error) {
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError && error.code === "P2022") {
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
