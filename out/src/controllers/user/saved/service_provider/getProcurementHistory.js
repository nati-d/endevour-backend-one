"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../../../../prisma/"));
const response_1 = __importDefault(require("../../../../types/response"));
exports.default = async (req, res) => {
    try {
        let user = req.query?.user
            ? parseInt(req.query?.user)
            : undefined;
        let sp = req.query?.service_provider
            ? parseInt(req.query?.service_provider)
            : undefined;
        let totalPages = 0;
        let page = req.query.page
            ? (parseInt(req.query.page) - 1) * 10
            : req.body.page
                ? (req.body.page - 1) * 10
                : 0;
        let currentPage = page ? page / 10 + 1 : 1;
        let data = await prisma_1.default.client.procurement.findMany({
            take: 10,
            skip: page,
            where: {
                user: user,
                service_provider: sp,
            },
            include: {
                user_: {
                    select: {
                        id: true,
                        first_name: true,
                        last_name: true,
                        email: true,
                        profile_image: true,
                    },
                },
                service_provider_: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        });
        let totalData = await prisma_1.default.client.procurement.count({
            where: {
                user: user,
                service_provider: sp,
            },
        });
        totalPages = Math.ceil(totalData / 10);
        return res.status(200).json(new response_1.default(true, "data fetched successfully", {
            data,
            total_pages: totalPages,
            current_page: currentPage,
            next_page: currentPage >= totalPages ? null : currentPage + 1,
        }));
    }
    catch (error) {
        console.log(error);
        return res
            .status(500)
            .json(new response_1.default(false, "error while processing request"));
    }
};
