"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../../prisma/index"));
const fs_1 = __importDefault(require("fs"));
const client_1 = require("@prisma/client");
const index_2 = __importDefault(require("../../validation/index"));
const response_1 = __importDefault(require("../../types/response"));
exports.default = async (req, res) => {
    const thumbnail = Array.isArray(req.files) ? req.files[0]?.filename : null;
    let id = parseInt(req.body.id);
    let oldNews;
    req.body.tags = req.body.tags ? JSON.parse(req.body.tags) : [];
    req.body.tags_to_remove = req.body.tags_to_remove ? JSON.parse(req.body.tags_to_remove) : [];
    const { error } = index_2.default.news.updateNews.validate(req.body);
    if (error)
        return res.status(400).json(new response_1.default(false, "unidentified request content", error.details));
    try {
        oldNews = await index_1.default.client.news.findFirst({ where: { id } });
        const newNews = await index_1.default.client.news.update({
            where: { id },
            data: {
                title: req.body.title,
                overview: req.body.overview,
                thumbnail,
                body: req.body.body,
                posted_by: req.auth?.id,
                tags: {
                    connectOrCreate: req.body.tags.map((name) => ({
                        where: { name },
                        create: { name }
                    })),
                    disconnect: req.body.tags_to_remove.map((name) => ({ name })),
                },
            }, include: {
                tags: { select: { name: true } }
            }
        });
        res.status(200).json(new response_1.default(true, "News updated successfully", newNews));
    }
    catch (error) {
        console.error(error);
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            return res.status(400).json(new response_1.default(false, 'error while updating news', error));
        }
        return res.status(500).json(new response_1.default(false, "Error while posting news"));
    }
    try {
        fs_1.default.unlink("public/images/news/thumbnail/" + oldNews.thumbnail, error => {
            console.log(error);
        });
    }
    catch (error) {
        console.error(error);
    }
};
