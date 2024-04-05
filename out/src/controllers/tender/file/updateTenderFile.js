"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = __importDefault(require("../../../prisma/client/prismaClient"));
const response_1 = __importDefault(require("../../../types/response"));
const updateTenderFile = async (req, res) => {
    try {
        const { id } = req.params;
        const { file, tender_id } = req.body;
        const updatedFile = await prismaClient_1.default.tender_files.update({
            where: { id: Number(id) },
            data: {
                file,
                tender_id,
            },
        });
        return res.json(new response_1.default(true, "Tender file updated successfully", updatedFile));
    }
    catch (error) {
        console.error("Error updating tender file:", error);
        return res
            .status(500)
            .json(new response_1.default(false, "Internal server error"));
    }
};
exports.default = updateTenderFile;
