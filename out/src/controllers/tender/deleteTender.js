"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const response_1 = __importDefault(require("../../types/response"));
const prismaClient_1 = __importDefault(require("../../prisma/client/prismaClient"));
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const deleteTender = async (req, res) => {
    try {
        const { tender_id } = req.query;
        const existingTender = await prismaClient_1.default.tender.findUnique({
            where: { id: Number(tender_id) },
            include: { files: true },
        });
        if (!existingTender)
            return res.status(404).json(new response_1.default(false, "Tender not found"));
        const fileDeletePromises = existingTender.files.map(async (file) => {
            const filePath = path_1.default.join(__dirname, "../../../public/files/tender_files", file.file);
            await promises_1.default.unlink(filePath);
        });
        await Promise.all(fileDeletePromises);
        await prismaClient_1.default.tender.delete({
            where: { id: Number(tender_id) },
        });
        return res.status(204).end();
    }
    catch (error) {
        console.error("Error deleting tender:", error);
        return res
            .status(500)
            .json(new response_1.default(false, "Internal server error"));
    }
};
exports.default = deleteTender;
