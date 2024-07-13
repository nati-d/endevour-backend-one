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
        const { error } = index_2.default.grant.createGrant.validate(req.body);
        if (error) {
            return res.status(400).json(new response_1.default(false, error.message));
        }
    }
    catch (error) {
        return res.status(400).json(new response_1.default(false, 'error at validating request'));
    }
    try {
        const newGrant = await index_1.default.client.grant.create({
            data: {
                title: req.body.title,
                overview: req.body.overview,
                body: req.body.body,
                verified_by: req.auth?.id,
                location: req.body.location,
                opportunity_number: req.body.opportunity_number,
                cfda: req.body.cfda,
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
        res.status(201).json(new response_1.default(true, "Grant created successfully", newGrant));
    }
    catch (error) {
        console.error("Error while posting news:", error);
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2022")
                return res.status(403).json(new response_1.default(false, "not authorized to post blogs", error));
        }
        return res.status(500).json(new response_1.default(false, "Error while posting grant"));
    }
};
