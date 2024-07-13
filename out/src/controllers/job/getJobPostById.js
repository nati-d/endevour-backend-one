"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../../prisma/index"));
const client_1 = require("@prisma/client");
const lodash_1 = require("lodash");
const response_1 = __importDefault(require("../../types/response"));
exports.default = async (req, res) => {
    try {
        let id = (0, lodash_1.parseInt)(req.query.id) || req.body.id;
        let jobPost;
        jobPost = await index_1.default.client.job_post.findFirst({
            where: { id },
            include: {
                salary: {
                    select: {
                        id: false,
                        low_end: true,
                        high_end: true,
                        periodicity: true,
                        currency: true,
                    },
                },
                tags: { select: { name: true } },
                job_category: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
                user: {
                    select: {
                        id: true,
                        first_name: true,
                        last_name: true,
                        email: true,
                        phone_number: true,
                        password: false,
                        profile_image: true,
                        location: false,
                        verified_by: false,
                        token: false,
                        is_recommender: false
                    }
                },
                admin: {
                    select: {
                        id: true,
                        first_name: true,
                        last_name: true,
                        email: false,
                        phone_number: false,
                        password: false,
                        role: false,
                        profile_image: true,
                        created_at: false,
                        updated_at: false,
                    }
                }
            },
        });
        if (jobPost)
            return res
                .status(200)
                .json(new response_1.default(true, "job post fetched successfully", jobPost));
        else
            return res
                .status(204)
                .json(new response_1.default(false, "job post does not exit", jobPost));
    }
    catch (error) {
        console.error(error);
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2022")
                return res
                    .status(403)
                    .json(new response_1.default(false, "not authorized to get job posts"));
        }
        return res
            .status(400)
            .json(new response_1.default(false, "error while getting job post"));
    }
};
