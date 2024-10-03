"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const response_1 = __importDefault(require("../../types/response"));
const prismaClient_1 = __importDefault(require("../../prisma/client/prismaClient"));
const cloudinary_1 = require("cloudinary");
const deleteTender = async (req, res) => {
    try {
        const { tender_id } = req.params;
        const existingTender = await prismaClient_1.default.tender.findUnique({
            where: { id: parseInt(tender_id) },
            include: { files: true },
        });
        if (!existingTender) {
            return res.status(404).json(new response_1.default(false, "Tender not found"));
        }
        if (existingTender.files && existingTender.files.length > 0) {
            const fileDeletePromises = existingTender.files.map(async (file) => {
                try {
                    const publicId = file.file.split('/').pop()?.split('.')[0];
                    if (publicId) {
                        await cloudinary_1.v2.uploader.destroy(publicId);
                    }
                }
                catch (error) {
                    console.error(`Failed to delete file from Cloudinary: ${file.file}`, error);
                }
            });
            await Promise.all(fileDeletePromises);
        }
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
