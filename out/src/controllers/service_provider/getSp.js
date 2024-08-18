"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../../prisma/index"));
const client_1 = require("@prisma/client");
const response_1 = __importDefault(require("../../types/response"));
exports.default = async (req, res) => {
    try {
        let id = parseInt(req.query.id) || req.body.id;
        let verified_by = req.auth?.is_admin
            ? parseInt(req.query.verified_by)
            : { not: null };
        let sp_category = req.body.service_category;
        let where = {
            id,
            verified_by: verified_by == 0
                ? { not: null }
                : verified_by == -1
                    ? null
                    : verified_by,
            service_category: sp_category,
        };
        console.log(where);
        let service_provider;
        let totalPages = 0;
        let page = req.query.page
            ? (parseInt(req.query.page) - 1) * 10
            : req.body.page
                ? (req.body.page - 1) * 10
                : 0;
        let currentPage = page ? page / 10 + 1 : 1;
        service_provider = await index_1.default.client.service_provider.findMany({
            take: 10,
            skip: page,
            where,
            orderBy: {
                created_at: "desc",
            },
            select: {
                id: true,
                name: true,
                phone: true,
                email: true,
                about: true,
                verified_by: true,
                service_category: true,
                created_at: true,
                updated_at: true,
            },
        });
        totalPages = await index_1.default.client.service_provider.count({ where });
        totalPages = Math.ceil(totalPages / 10);
        let __sp_category = await index_1.default.client.service_provider.findMany({
            where: {
                service_category: sp_category,
                verified_by: verified_by == 0
                    ? { not: null }
                    : verified_by == -1
                        ? null
                        : verified_by,
            },
            select: {
                name: true,
            },
        });
        let _sp_category = __sp_category.map((data) => data.name);
        res
            .status(200)
            .json(new response_1.default(true, "service provider fetched successfully", {
            service_provider: service_provider,
            total_pages: totalPages,
            current_page: currentPage,
            next_page: currentPage >= totalPages ? null : currentPage + 1,
            service_category: _sp_category,
        }));
    }
    catch (error) {
        console.error("Error while posting service provider:", error);
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2022")
                return res
                    .status(400)
                    .json(new response_1.default(false, "Not authorized to post service provider", error));
        }
        return res
            .status(500)
            .json(new response_1.default(false, "Error while posting service provider", error));
    }
};
