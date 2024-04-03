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
        const { error } = index_2.default.job.jobPost.validate(req.body);
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
    let jobId = 0;
    try {
        if (req.body.auth.role == "ADMIN" || req.body.auth.role == "SUPER_ADMIN") {
            const newJobPost = await index_1.default.client.job_post.create({
                data: {
                    title: req.body.title,
                    overview: req.body.overview,
                    body: req.body.body,
                    contract_type: req.body.contract_type,
                    year_of_experience: req.body.year_of_experience,
                    thumbnail: req.body.thumbnail,
                    category: req.body.category,
                    closing_date: new Date(req.body.closing_date),
                    verified_at: new Date(),
                    verified_by: req.body.auth.id,
                }
            });
            jobId = newJobPost.id;
            await index_1.default.client.salary.create({
                data: {
                    id: newJobPost.id,
                    low_end: req.body.low_end,
                    high_end: req.body.high_end,
                    periodicity: req.body.periodicity,
                    currency: req.body.currency,
                }
            });
            res.send(newJobPost);
        }
    }
    catch (error) {
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            if (error.code = "P2022") {
                return res.status(400).json({
                    status: false,
                    message: 'Not authorized to post jobs',
                    error: error,
                });
            }
        }
        await index_1.default.client.job_post.delete({
            where: {
                id: jobId
            }
        });
    }
    // try {
    //     if (req.body.auth.role == "ADMIN" || req.body.auth.role == "SUPER_ADMIN")
    // } catch (error) {
    //     if (error instanceof Prisma.PrismaClientKnownRequestError) {
    //         if (error.code = "P2022") {
    //             return res.status(400).json({
    //                 status: false,
    //                 message: 'Not authorized to post jobs',
    //                 error: error,
    //             });
    //         }
    //     }
    //     console.error("Error while insert job post:", error);
    //     return res.status(500).send({
    //         success: false,
    //         message: 'Unknown error at posting job',
    //         error: error,
    //     }); 
    // }
};
