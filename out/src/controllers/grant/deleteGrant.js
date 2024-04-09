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
    const { error } = index_2.default.grant.deleteGrant.validate(req.body);
    if (error) {
        return res.status(400).json(new response_1.default(false, "unidentified request content", error.details));
    }
    try {
        const newGrant = await index_1.default.client.grant.delete({
            where: {
                id: req.body.id
            }
        });
        res.status(201).json({
            success: true,
            message: "Grant deleted successfully",
            data: newGrant
        });
    }
    catch (error) {
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            return res.status(400).json({
                success: false,
                message: 'error while deleting grant',
                data: error,
            });
        }
        return res.status(500).json({
            success: false,
            message: "Error while posting grant",
            data: error,
        });
    }
};
