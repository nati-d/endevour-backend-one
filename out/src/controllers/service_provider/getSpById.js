"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../../prisma/index"));
const client_1 = require("@prisma/client");
const lodash_1 = require("lodash");
const response_1 = __importDefault(require("../../types/response"));
exports.default = async (req, res) => {
    try {
        let id = (0, lodash_1.parseInt)(req.query.id) || req.body.id;
        let sp;
        sp = await index_1.default.client.service_provider.findFirst({
            where: { id },
            select: {
                id: true,
                name: true,
                phone: true,
                email: true,
                about: true,
                verified_by: true,
                service_category: true,
                created_at: true,
                updated_at: true
            }
        });
        if (sp)
            return res.status(200).json(new response_1.default(true, "service provider fetched successfully", sp));
        else
            return res.status(204).json(new response_1.default(false, "service provider does not exit", sp));
    }
    catch (error) {
        console.error(error);
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2022")
                return res.status(403).json(new response_1.default(false, "not authorized to get service provider"));
        }
        return res.status(400).json(new response_1.default(false, "error while getting service provider"));
    }
};
