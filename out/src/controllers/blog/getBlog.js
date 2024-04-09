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
        const { error } = index_2.default.blog.getBlog.validate(req.body);
        if (error) {
            return res.status(400).json(new response_1.default(false, "unidentified request content", error.details));
        }
    }
    catch (error) {
        return res.status(400).json(new response_1.default(false, "error while validating request"));
    }
    try {
        let newBlog;
        if (req.auth?.role == "ADMIN" || req.auth?.role == "SUPER_ADMIN")
            newBlog = await index_1.default.client.blog.findMany({
                where: {
                    id: req.body.id,
                    title: req.body.title,
                    verified_by: req.body.verified_by,
                    posted_by: req.body.posted_by,
                    created_at: {
                        gte: req.body?.date?.lower_bound,
                        lte: req.body?.date?.upper_bound,
                    },
                    tags: req.body.tags && req.body.tags.length > 0 ? { some: { id: { in: req.body.tags } } } : {}
                },
                include: {
                    tags: {
                        select: {
                            id: true,
                        },
                    },
                }
            });
        else
            newBlog = await index_1.default.client.blog.findMany({
                where: {
                    id: req.body.id,
                    title: req.body.title,
                    posted_by: req.body.posted_by,
                    created_at: {
                        gte: req.body?.date?.lower_bound,
                        lte: req.body?.date?.upper_bound,
                    },
                    tags: req.body.tags && req.body.tags.length > 0 ? { some: { id: { in: req.body.tags } } } : {}
                }
            });
        res.status(201).json(new response_1.default(true, "blog gotted successfully", newBlog));
    }
    catch (error) {
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError &&
            error.code === "P2022") {
            return res.status(400).json(new response_1.default(false, "not authorized to post blogs"));
        }
        res.status(400).json(new response_1.default(false, "error while getting blog"));
    }
};
