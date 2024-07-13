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
        const { error } = index_2.default.grant.updateGrant.validate(req.body);
        if (error) {
            return res.status(400).json(new response_1.default(false, "unidentified reqeuest content", error.details));
        }
    }
    catch (error) {
        return res.status(400).json(new response_1.default(false, "error at validating request"));
    }
    try {
        const grant = await index_1.default.client.grant.update({
            where: {
                id: req.body.id
            },
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
                    })),
                    disconnect: req.body.tags_to_remove.map((name) => ({ name })),
                }
            },
            include: { tags: { select: { name: true } } }
        });
        res.status(200).json(new response_1.default(true, "grant updated successfully", grant));
    }
    catch (error) {
        console.log(error);
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2022")
                return res.status(403).json(new response_1.default(false, "not authorized to post blogs", error));
            if (error.code === "P2016")
                return res.status(404).json(new response_1.default(false, "resource to be updated not found", error));
        }
        return res.status(500).json(new response_1.default(false, "Error while posting "));
    }
};
