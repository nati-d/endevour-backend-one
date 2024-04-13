"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../../prisma/index"));
const client_1 = require("@prisma/client");
const index_2 = __importDefault(require("../../validation/index"));
const response_1 = __importDefault(require("../../types/response"));
exports.default = async (req, res) => {
    const { error } = index_2.default.job.getJobPost.validate(req.body);
    if (error)
        return res.status(400).send(new response_1.default(false, "unidentified request content", error.details));
    try {
        let job;
        let totalPages = 0;
        let page = req.body.page ? (req.body.page - 1) * 10 : 0;
        const jobPosts = await index_1.default.client.job_post.findMany({
            take: 10,
            skip: page,
            where: {
                id: req.body.id,
                contract_type: {
                    in: req.body.contract_type
                },
                year_of_experience: {
                    gte: req.body?.year_of_experience?.lower_bound,
                    lte: req.body?.year_of_experience?.upper_bound
                },
                category: {
                    in: req.body.category
                },
                closing_date: {
                    gte: req.body?.closing_date?.lower_bound,
                    lte: req.body?.closing_date?.upper_bound
                },
                salary: {
                    low_end: {
                        lte: req.body?.salary?.high_end,
                    },
                    high_end: {
                        gte: req.body?.salary?.low_end,
                    },
                    periodicity: {
                        in: req.body?.salary?.periodicity
                    },
                    currency: {
                        in: req.body?.salary?.currency,
                    }
                },
                created_at: {
                    gte: req.body?.closing_date?.lower_bound,
                    lte: req.body?.closing_date?.upper_bound
                }
            },
            include: {
                salary: {
                    select: {
                        id: false,
                        low_end: true,
                        high_end: true,
                        periodicity: true,
                        currency: true
                    }
                }
            },
            orderBy: {
                id: 'desc'
            }
        });
        totalPages = await index_1.default.client.job_post.count({
            take: 10,
            skip: page,
            where: {
                id: req.body.id,
                contract_type: {
                    in: req.body.contract_type
                },
                year_of_experience: {
                    gte: req.body?.year_of_experience?.lower_bound,
                    lte: req.body?.year_of_experience?.upper_bound
                },
                category: {
                    in: req.body.category
                },
                closing_date: {
                    gte: req.body?.closing_date?.lower_bound,
                    lte: req.body?.closing_date?.upper_bound
                },
                salary: {
                    low_end: {
                        lte: req.body?.salary?.high_end,
                    },
                    high_end: {
                        gte: req.body?.salary?.low_end,
                    },
                    periodicity: {
                        in: req.body?.salary?.periodicity
                    },
                    currency: {
                        in: req.body?.salary?.currency,
                    }
                },
                created_at: {
                    gte: req.body?.closing_date?.lower_bound,
                    lte: req.body?.closing_date?.upper_bound
                }
            },
        });
        res.status(200).json(new response_1.default(true, "jop posts fetched successfully", { job_post: jobPosts, total_pages: totalPages }));
    }
    catch (error) {
        console.log(error);
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2022")
                return res.status(400).json(new response_1.default(false, "Not authorized to get get"));
        }
        return res.status(500).json(new response_1.default(false, "Error while fetching job post", error));
    }
};
