"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = __importDefault(require("../../../prisma/client/prismaClient"));
const response_1 = __importDefault(require("../../../types/response"));
const getAllTenderCategories = async (req, res) => {
    try {
        const categories = await prismaClient_1.default.tender_category.findMany();
        return res.json(new response_1.default(true, "Tender categories fetched successfully", categories));
    }
    catch (error) {
        console.error("Error fetching tender categories:", error);
        return res
            .status(500)
            .json(new response_1.default(false, "Internal server error"));
    }
};
exports.default = getAllTenderCategories;
