"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../../../prisma/index"));
const lodash_1 = require("lodash");
const response_1 = __importDefault(require("../../../types/response"));
exports.default = async (req, res) => {
    try {
        let totalPages = 0;
        let page = req.query.page ? ((0, lodash_1.parseInt)(req.query.page) - 1) * 10 : req.body.page ? (req.body.page - 1) * 10 : 0;
        let currentPage = page ? page / 10 + 1 : 1;
        let where = {
            posted_by: req.query.posted_by ? (0, lodash_1.parseInt)(req.query.posted_by) : undefined,
        };
        let post = await index_1.default.client.service_provider_post.findMany({
            take: 10,
            skip: page,
            where,
            orderBy: { created_at: 'desc' },
            include: {
                service_provider: {
                    select: {
                        id: true,
                        name: true,
                        verified_by: true
                    }
                }
            }
        });
        totalPages = await index_1.default.client.service_provider_post.count({ where });
        totalPages = Math.ceil(totalPages / 10);
        return res.status(200).json(new response_1.default(true, "data fetched successfully", {
            posts: post,
            current_page: currentPage,
            next_page: currentPage >= totalPages ? null : currentPage + 1,
            total_pages: totalPages
        }));
    }
    catch (error) {
        console.error(error);
        return res.status(500).json(new response_1.default(false, "error while processing request"));
    }
};
