"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = __importDefault(require("../../../prisma/client/prismaClient"));
const response_1 = __importDefault(require("../../../types/response"));
const getAllTenderCategories = async (req, res) => {
    const { page } = req.query;
    const categoriesPerPage = 10;
    try {
        const totalCategories = await prismaClient_1.default.tender_category.count();
        const categories = await prismaClient_1.default.tender_category.findMany({
            skip: page
                ? (parseInt(page.toString()) - 1) * categoriesPerPage
                : undefined,
            take: categoriesPerPage,
        });
        const numberOfPages = Math.ceil(totalCategories / categoriesPerPage);
        return res.json(new response_1.default(true, "Tender categories fetched successfully", {
            categories,
            totalPages: numberOfPages,
            currentPage: Number(page),
            nextPage: page && parseInt(page?.toString()) < numberOfPages
                ? parseInt(page.toString()) + 1
                : null,
        }));
    }
    catch (error) {
        console.error("Error fetching tender categories:", error);
        return res
            .status(500)
            .json(new response_1.default(false, "Internal server error"));
    }
};
exports.default = getAllTenderCategories;
