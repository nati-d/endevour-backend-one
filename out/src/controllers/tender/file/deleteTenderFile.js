"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const response_1 = __importDefault(require("../../../types/response"));
const prismaClient_1 = __importDefault(require("../../../prisma/client/prismaClient"));
const cloudinary_1 = require("cloudinary");
const deleteTenderFile = async (req, res) => {
    try {
        const { id } = req.params;
        const existingFile = await prismaClient_1.default.tender_files.findUnique({
            where: { id: Number(id) },
        });
        if (!existingFile) {
            return res.status(404).json(new response_1.default(false, "File not found"));
        }
        const publicId = existingFile.file.split('/').pop()?.split('.')[0];
        if (publicId) {
            try {
                await cloudinary_1.v2.uploader.destroy(publicId);
            }
            catch (error) {
                console.error(`Failed to delete file from Cloudinary: ${existingFile.file}`, error);
            }
        }
        await prismaClient_1.default.tender_files.delete({
            where: { id: Number(id) },
        });
        return res.json(new response_1.default(true, "Tender file deleted successfully"));
    }
    catch (error) {
        console.error("Error deleting tender file:", error);
        return res
            .status(500)
            .json(new response_1.default(false, "Internal server error"));
    }
};
exports.default = deleteTenderFile;
