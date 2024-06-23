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
        let data = await prisma_1.default.client.saved_service_provider.findMany({
            take: 10,
            skip: page,
            where: { user: req.auth.id },
            include: {
                user_: {
                    select: {
                        id: true,
                        first_name: true,
                        last_name: true,
                        email: true,
                        phone_number: true,
                        profile_image: true,
                        location: true,
                    }
                },
                service_provider_: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        verified_by: true,
                        service_category: true,
                        about: true
                    }
                }
            }
        });
        let totalData = await prisma_1.default.client.saved_service_provider.count({ where: { user: req.auth.id } });
        totalPages = Math.ceil(totalData / 10);
        return res.status(200).json(new response_1.default(true, "data fetched successfully", { data, total_pages: totalPages }));
    }
    catch (error) {
        console.log(error);
        return res.status(500).json(new response_1.default(false, "error while processing request"));
    }
};
