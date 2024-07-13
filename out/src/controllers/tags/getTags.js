"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = __importDefault(require("../../prisma/client/prismaClient"));
const response_1 = __importDefault(require("../../types/response"));
const getTags = async (req, res) => {
    const { page } = req.query;
    const tagsPerPage = 10;
    try {
        const totalTags = await prismaClient_1.default.tag.count();
        const tags = await prismaClient_1.default.tag.findMany({
            skip: page ? (parseInt(page.toString()) - 1) * tagsPerPage : undefined,
            take: tagsPerPage,
        });
        const numberOfPages = Math.ceil(totalTags / tagsPerPage);
        return res.status(200).json(new response_1.default(true, "Tags getted successfully.", {
            tags,
            totalPages: numberOfPages,
            currentPage: Number(page),
            nextPage: page && parseInt(page?.toString()) < numberOfPages
                ? parseInt(page.toString()) + 1
                : null,
        }));
    }
    catch (error) {
        console.log(error);
        return res
            .status(500)
            .json(new response_1.default(false, "Failed to get tags!", null, error));
    }
};
exports.default = getTags;
