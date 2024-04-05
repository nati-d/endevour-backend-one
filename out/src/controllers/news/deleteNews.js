"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../../prisma/index"));
const client_1 = require("@prisma/client");
const index_2 = __importDefault(require("../../validation/index"));
exports.default = async (req, res) => {
    const { error } = index_2.default.news.deleteNews.validate(req.body);
    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details,
            data: null,
        });
    }
    try {
        const newNews = await index_1.default.client.news.delete({
            where: {
                id: req.body.id
            }
        });
        res.status(201).json({
            success: true,
            message: "News deleted successfully",
            data: newNews
        });
    }
    catch (error) {
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            return res.status(400).json({
                success: false,
                message: 'error while deleting news',
                data: error,
            });
        }
        return res.status(500).json({
            success: false,
            message: "Error while posting news",
            data: error,
        });
    }
};
