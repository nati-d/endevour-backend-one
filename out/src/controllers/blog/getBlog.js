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
    const { error } = index_2.default.blog.getBlog.validate(req.body);
    if (error) {
        return res.status(400).json(new response_1.default(false, "unidentified request content", error.details));
    }
    try {
        let blog;
        let totalPages = 0;
        let page = req.body.page ? (req.body.page - 1) * 10 : 0;
        if (req.auth?.role == "ADMIN" || req.auth?.role == "SUPER_ADMIN") {
            blog = await index_1.default.client.blog.findMany({
                take: 10,
                skip: page,
                where: {
                    id: req.body.id,
                    title: req.body.title,
                    verified_by: req.body.verified_by,
                    posted_by: req.body.posted_by,
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
                orderBy: {
                    id: 'desc'
                }
            });
            totalPages = await index_1.default.client.blog.count({
                where: {
                    id: req.body.id,
                    title: req.body.title,
                    verified_by: req.body.verified_by,
                    posted_by: req.body.posted_by,
                    created_at: {
                        gte: req.body?.date?.lower_bound,
                        lte: req.body?.date?.upper_bound,
                    },
                    tags: req.body.tags && req.body.tags.length > 0 ? { some: { name: { in: req.body.tags } } } : {}
                }
            });
            totalPages = Math.ceil(totalPages / 10);
        }
        else
            blog = await index_1.default.client.blog.findMany({
                take: 1,
                skip: 3,
                where: {
                    id: req.body.id,
                    title: req.body.title,
                    posted_by: req.body.posted_by,
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
                }
            });
        return res.status(200).json(new response_1.default(true, "blog gotted successfully", ({ blog, totalPages })));
    }
    catch (error) {
        console.error(error);
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2022")
                return res.status(403).json(new response_1.default(false, "not authorized to get blogs"));
        }
        return res.status(400).json(new response_1.default(false, "error while getting blog"));
    }
};
