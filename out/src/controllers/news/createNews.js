"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../../prisma/index"));
const client_1 = require("@prisma/client");
const index_2 = __importDefault(require("../../validation/index"));
const response_1 = __importDefault(require("../../types/response"));
exports.default = async (req, res) => {
    try {
        const { error } = index_2.default.news.createNews.validate(req.body);
        if (error) {
            return res.status(400).json(new response_1.default(false, "unidentified request content", error.details));
        }
    }
    catch (error) {
        return res.status(400).json(new response_1.default(false, "Error at request validation"));
    }
    try {
        const newNews = await index_1.default.client.news.create({
            data: {
                title: req.body.title,
                overview: req.body.overview,
                thumbnail: req.body.thumbnail,
                body: req.body.body,
                posted_by: req.auth?.id,
                tags: {
                    connectOrCreate: req.body.tags.map((name) => ({
                        where: { name },
                        create: { name }
                    }))
                }
            },
            include: {
                tags: { select: { name: true } }
            }
        });
        res.status(201).json(new response_1.default(true, "news created successfully", newNews));
    }
    catch (error) {
        console.log(error);
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2022") {
                return res.status(400).json(new response_1.default(false, "not authorized to post news", error));
            }
        }
        return res.status(500).json(new response_1.default(false, "Error while posting news"));
    }
};
