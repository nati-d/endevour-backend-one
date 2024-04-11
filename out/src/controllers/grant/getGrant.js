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
        const { error } = index_2.default.grant.getGrant.validate(req.body);
        if (error) {
            return res
                .status(400)
                .json(new response_1.default(false, "unidentified request content", error.details));
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
        const newgrant = await index_1.default.client.grant.findMany({
            where: {
                id: req.body.id,
                title: req.body.title,
                opportunity_number: req.body.opportunity_number,
                cfda: req.body.cdfa,
                created_at: {
                    gte: req.body?.date?.lower_bound,
                    lte: req.body?.date?.upper_bound,
                },
                tags: req.body.tags && req.body.tags.length > 0
                    ? { some: { name: { in: req.body.tags } } }
                    : {},
            },
            include: {
                tags: {
                    select: {
                        name: true,
                    },
                },
            },
        });
        res.status(201).json({
            success: true,
            message: "grant gotted successfully",
            data: newgrant,
        });
    }
    catch (error) {
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError &&
            error.code === "P2022") {
            return res.status(400).json({
                success: false,
                message: "Not authorized to post grant",
                data: error,
            });
        }
        console.error("Error while posting grant:", error);
        return res.status(500).json({
            success: false,
            message: "Error while posting grant",
            data: error,
        });
    }
};
