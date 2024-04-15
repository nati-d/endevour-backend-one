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
    const { error } = index_2.default.grant.getGrant.validate(req.body);
    if (error) {
        return res.status(400).json(new response_1.default(false, "unidentified request content", error.details));
    }
    try {
        let id = parseInt(req.query.id) || req.body.id;
        let title = req.query.title || req.body.title;
        let verified_by = parseInt(req.query.verified_by) || req.body.verified_by;
        let opportunity_number = req.query.opportunity_number || req.body.opportunity_number;
        let cfda = req.query.cfda || req.body.cfda;
        let date_lower_bound = req.query.date_lower_bound || req.body?.date?.lower_bound;
        let date_upper_bound = req.query.date_upper_bound || req.body?.date?.upper_bound;
        let tags = !req.query.tags ? undefined : JSON.parse(req.query.tags) || req.body.tags;
        let where = {
            id,
            title,
            opportunity_number,
            cfda,
            verified_by,
            created_at: {
                gte: date_lower_bound,
                lte: date_upper_bound,
            },
            tags: tags && tags.length > 0 ? { some: { name: { in: tags } } } : {}
        };
        let grant;
        let totalPages = 0;
        let page = req.query.page ? (parseInt(req.query.page) - 1) * 10 : req.body.page ? (req.body.page - 1) * 10 : 0;
        grant = await index_1.default.client.grant.findMany({
            take: 10,
            skip: page,
            where,
            include: {
                tags: { select: { name: true } }
            },
            orderBy: {
                id: "desc"
            }
        });
        totalPages = await index_1.default.client.blog.count({ where });
        totalPages = Math.ceil(totalPages / 10);
        return res.status(200).json(new response_1.default(true, "grants fetched successfully", { grant: grant, total_pages: totalPages }));
    }
    catch (error) {
        console.error("Error while posting grant:", error);
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2022")
                return res.status(400).json(new response_1.default(false, "Not authorized to get get"));
        }
        return res.status(500).json(new response_1.default(false, "Error while fetching grants"));
    }
};
