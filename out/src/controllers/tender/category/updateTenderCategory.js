"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = __importDefault(require("../../../prisma/client/prismaClient"));
const response_1 = __importDefault(require("../../../types/response"));
const updateTenderCategory = async (req, res) => {
    try {
        const { category_id } = req.query;
        const { name } = req.body;
        const adminId = req.auth?.id;
        const updatedCategory = await prismaClient_1.default.tender_category.update({
            where: { id: Number(category_id) },
            data: {
                name,
                verified_by: adminId,
            },
        });
        res.json(new response_1.default(true, "Tender category updated successfully.", updatedCategory));
    }
    catch (error) {
        res
            .status(500)
            .json(new response_1.default(false, "Unable to update tender category"));
    }
};
exports.default = updateTenderCategory;
