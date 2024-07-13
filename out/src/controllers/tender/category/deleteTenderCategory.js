"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = __importDefault(require("../../../prisma/client/prismaClient"));
const response_1 = __importDefault(require("../../../types/response"));
const deleteTenderCategory = async (req, res) => {
    try {
        const { category_id } = req.query;
        await prismaClient_1.default.tender_category.delete({
            where: { id: Number(category_id) },
        });
        res.json(new response_1.default(true, "Tender category deleted successfully"));
    }
    catch (error) {
        res
            .status(500)
            .json(new response_1.default(false, "Unable to delete tender category"));
    }
};
exports.default = deleteTenderCategory;
