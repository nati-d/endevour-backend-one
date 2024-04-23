"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../../prisma/index"));
const client_1 = require("@prisma/client");
const lodash_1 = require("lodash");
const index_2 = __importDefault(require("../../validation/index"));
const response_1 = __importDefault(require("../../types/response"));
exports.default = async (req, res) => {
    const { error } = index_2.default.blog.getBlog.validate(req.body);
    if (error) {
        return res.status(400).json(new response_1.default(false, "unidentified request content", error.details));
    }
    try {
        let id = (0, lodash_1.parseInt)(req.query.id) || req.body.id;
        let title = req.query.title || req.body.title;
        let verified_by = (0, lodash_1.parseInt)(req.query.verified_by) || req.body.verified_by;
        let posted_by = (0, lodash_1.parseInt)(req.query.posted_by) || req.body.posted_by;
        let date_lower_bound = req.query.date_lower_bound || req.body?.date?.lower_bound;
        let date_upper_bound = req.query.date_upper_bound || req.body?.date?.upper_bound;
        let tags = !req.query.tags ? undefined : JSON.parse(req.query.tags) || req.body.tags;
        let where = {
            id,
            title,
            verified_by,
            posted_by,
            created_at: {
                gte: date_lower_bound,
                lte: date_upper_bound
            },
            tags: tags && tags.length > 0 ? { some: { name: { in: tags } } } : {}
        };
        let blog;
        let totalPages = 0;
        let page = req.query.page ? ((0, lodash_1.parseInt)(req.query.page) - 1) * 10 : req.body.page ? (req.body.page - 1) * 10 : 0;
        if (req.auth?.role == "ADMIN" || req.auth?.role == "SUPER_ADMIN") {
            blog = await index_1.default.client.blog.findMany({
                take: 10,
                skip: page,
                where,
                include: { tags: { select: { name: true } } },
                orderBy: {
                    id: 'desc'
                },
            });
        }
        else
            blog = await index_1.default.client.blog.findMany({
                take: 10,
                skip: page,
                where,
                include: { tags: { select: { name: true } } },
                orderBy: {
                    id: 'desc'
                }
            });
        totalPages = await index_1.default.client.blog.count({ where });
        totalPages = Math.ceil(totalPages / 10);
        let __tags = await index_1.default.client.tag.findMany({
            where: {
                blog: { some: {} }
            },
            select: {
                name: true
            }
        });
        let _tags = __tags.map(data => data.name);
        return res.status(200).json(new response_1.default(true, "blog fetched successfully", ({ blog, total_pages: totalPages, tags: _tags })));
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
