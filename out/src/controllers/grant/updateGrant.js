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
        const newGrant = await index_1.default.client.grant.update({
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
                    connectOrCreate: req.body.tags.map((id) => ({
                        where: { id },
                        create: { id }
                    })),
                    disconnect: req.body.tags_to_remove.map((id) => ({ id })),
                }
            }
        });
        res.status(201).json({
            success: true,
            message: "Grant updated successfully",
            data: newGrant
        });
    }
    catch (error) {
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            return res.status(400).json({
                success: false,
                message: 'error while updating grant',
                data: error,
            });
        }
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error while posting grant",
            data: error,
        });
    }
};
