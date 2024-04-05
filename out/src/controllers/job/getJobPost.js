"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../../prisma/index"));
const client_1 = require("@prisma/client");
const index_2 = __importDefault(require("../../validation/index"));
exports.default = async (req, res) => {
    try {
        const { error } = index_2.default.job.getJobPost.validate(req.body);
        if (error) {
            return res.send({
                success: false,
                message: error.details,
                data: null
            });
        }
    }
    catch (error) {
        console.error(error);
        return res.status(400).send({
            status: false,
            message: "Error at request validation",
            description: error
        });
    }
    try {
        const jobPosts = await index_1.default.client.job_post.findMany({
            where: {
                contract_type: {
                    in: req.body.contract_type
                },
                year_of_experience: {
                    gte: req.body.year_of_experience.lower_bound,
                    lte: req.body.year_of_experience.upper_bound
                },
                category: {
                    in: req.body.category
                },
                closing_date: {
                    gte: req.body.closing_date.lower_bound,
                    lte: req.body.closing_date.upper_bound
                },
                salary: {
                    low_end: {
                        lte: req.body.salary.high_end,
                    },
                    high_end: {
                        gte: req.body.salary.low_end,
                    },
                    periodicity: {
                        in: req.body.salary.periodicity
                    },
                    currency: {
                        in: req.body.salary.currency,
                    }
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
        });
        res.send({
            success: true,
            message: "successful",
            data: jobPosts
        });
    }
    catch (error) {
        console.log(error);
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            return res.status(400).json({
                status: false,
                message: error,
            });
        }
        return res.status(400).json({
            status: false,
            message: error
        });
    }
};
