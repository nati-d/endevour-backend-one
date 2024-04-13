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
        let grant;
        let totalPages = 0;
        let page = req.body.page ? (req.body.page - 1) * 10 : 0;
        grant = await index_1.default.client.grant.findMany({
            take: 10,
            skip: page,
            where: {
                id: req.body.id,
                title: req.body.title,
                opportunity_number: req.body.opportunity_number,
                cfda: req.body.cdfa,
                created_at: {
                    gte: req.body?.date?.lower_bound,
                    lte: req.body?.date?.upper_bound,
                },
                tags: req.body.tags && req.body.tags.length > 0 ? { some: { name: { in: req.body.tags } } } : {}
            },
            include: {
                tags: { select: { name: true } }
            },
            orderBy: {
                id: "desc"
            }
        });
        totalPages = await index_1.default.client.grant.count({
            where: {
                id: req.body.id,
                title: req.body.title,
                opportunity_number: req.body.opportunity_number,
                cfda: req.body.cdfa,
                created_at: {
                    gte: req.body?.date?.lower_bound,
                    lte: req.body?.date?.upper_bound,
                },
                tags: req.body.tags && req.body.tags.length > 0 ? { some: { name: { in: req.body.tags } } } : {}
            },
        });
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
