"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../../../prisma/index"));
const client_1 = require("@prisma/client");
const lodash_1 = require("lodash");
const response_1 = __importDefault(require("../../../types/response"));
exports.default = async (req, res) => {
    try {
        let categories;
        let totalPages = 0;
        let page = req.query.page ? ((0, lodash_1.parseInt)(req.query.page) - 1) * 10 : req.body.page ? (req.body.page - 1) * 10 : 0;
        let currentPage = page ? page / 10 + 1 : 1;
        categories = await index_1.default.client.service_provider_category.findMany({
            take: 10,
            skip: page,
            orderBy: {
                name: "desc",
            },
        });
        totalPages = await index_1.default.client.service_provider_category.count();
        totalPages = Math.ceil(totalPages / 10);
        res.status(200).json(new response_1.default(true, "categories fetched successfully", {
            service_provider_category: categories,
            total_pages: totalPages,
            current_page: currentPage,
            next_page: currentPage >= totalPages ? null : currentPage + 1,
        }));
    }
    catch (error) {
        console.log(error);
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2022")
                return res
                    .status(400)
                    .json(new response_1.default(false, "Not authorized to get service provider categories"));
        }
        return res
            .status(500)
            .json(new response_1.default(false, "Error while fetching categories", error));
    }
};
