"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../../../../prisma/"));
const response_1 = __importDefault(require("../../../../types/response"));
exports.default = async (req, res) => {
    try {
        let totalPages = 0;
        let page = req.query.page ? (parseInt(req.query.page) - 1) * 10 : req.body.page ? (req.body.page - 1) * 10 : 0;
        let data = await prisma_1.default.client.saved_blog.findMany({
            take: 10,
            skip: page,
            where: { user: req.auth.id },
        });
        let totalData = await prisma_1.default.client.saved_blog.count({ where: { user: req.auth.id } });
        totalPages = Math.ceil(totalData / 10);
        return res.status(200).json(new response_1.default(true, "data fetched successfully", { data, total_pages: totalPages }));
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(new response_1.default(false, "error while processing request"));
    }
};
