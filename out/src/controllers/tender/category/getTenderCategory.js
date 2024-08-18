"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = __importDefault(require("../../../prisma/client/prismaClient"));
const response_1 = __importDefault(require("../../../types/response"));
const getTenderCategory = async (req, res) => {
    try {
        const category_id = req.query.category_id;
        const category = await prismaClient_1.default.tender_category.findFirst({
            where: {
                id: parseInt(category_id),
            },
            orderBy: {
                created_at: "desc",
            },
        });
        if (!category)
            return res
                .status(404)
                .json(new response_1.default(false, "Invalid category id.", category));
        return res
            .status(200)
            .json(new response_1.default(true, "Category fetched successfully", category));
    }
    catch (error) {
        res
            .status(500)
            .json(new response_1.default(false, "Something went wrong please try again."));
    }
};
exports.default = getTenderCategory;
