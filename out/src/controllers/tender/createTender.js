"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = __importDefault(require("../../prisma/client/prismaClient"));
const response_1 = __importDefault(require("../../types/response"));
const library_1 = require("@prisma/client/runtime/library");
const createTender = async (req, res) => {
    try {
        const { tags, new_tags } = req.body;
        if (req.auth?.is_admin) {
            req.body.verified_by = req.auth.id;
            req.body.posted_by = null;
        }
        else {
            req.body.posted_by = req.auth?.id;
            req.body.verified_by = null;
        }
        const files = Array.isArray(req.files) ? req.files : [];
        const createdTender = await prismaClient_1.default.tender.create({
            data: {
                title: req.body.title,
                overview: req.body.overview,
                body: req.body.body,
                status: req.body.status,
                category: parseInt(req.body.category),
                opportunity_size: parseInt(req.body.opportunity_size),
                opening_date: req.body.opening_date,
                closing_date: req.body.closing_date,
                posted_by: req.body.posted_by,
                verified_by: req.body.verified_by,
                files: {
                    createMany: {
                        data: files.map((file) => ({
                            file: file.filename,
                        })),
                    },
                },
                tags: {
                    connect: JSON.parse(tags),
                    create: JSON.parse(new_tags),
                },
            },
        });
        return res
            .status(201)
            .json(new response_1.default(true, "Tender created successfully", createdTender));
    }
    catch (error) {
        console.error("Error creating tender:", error);
        if (error instanceof library_1.PrismaClientKnownRequestError) {
            if (error.code === "P2002")
                return res
                    .status(400)
                    .json(new response_1.default(false, "Tag already exists."));
        }
        return res
            .status(500)
            .json(new response_1.default(false, "Internal server error", null, error));
    }
};
exports.default = createTender;
