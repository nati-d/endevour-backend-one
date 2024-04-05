"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = __importDefault(require("../../prisma/client/prismaClient"));
const response_1 = __importDefault(require("../../types/response"));
const createTender = async (req, res) => {
    try {
        if (req.auth?.role) {
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
                price: parseFloat(req.body.price),
                starting_bid: parseFloat(req.body.starting_bid),
                eligibility: true,
                status: req.body.status,
                category: 1,
                opening_date: new Date(req.body.opening_date),
                closing_date: new Date(req.body.closing_date),
                posted_by: req.body.posted_by,
                verified_by: parseInt(req.body.verified_by),
                files: {
                    createMany: {
                        data: files.map((file) => ({
                            file: file.filename,
                        })),
                    },
                },
                tags: {
                    connectOrCreate: {
                        where: {
                            id: 1,
                        },
                        create: {
                            name: "tag1",
                        },
                    },
                },
            },
        });
        return res.json(new response_1.default(true, "Tender created successfully", createdTender));
    }
    catch (error) {
        console.error("Error creating tender:", error);
        return res
            .status(500)
            .json(new response_1.default(false, "Internal server error"));
    }
};
exports.default = createTender;
