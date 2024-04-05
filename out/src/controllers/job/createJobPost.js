"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../../prisma/index"));
const client_1 = require("@prisma/client");
const lodash_1 = __importDefault(require("lodash"));
const index_2 = __importDefault(require("../../validation/index"));
exports.default = async (req, res) => {
    try {
        const { error } = index_2.default.job.jobPost.validate(req.body);
        if (error) {
            return res.send({
                success: false,
                message: error.details,
                data: null,
            });
        }
    }
    catch (error) {
        return res.status(400).send({
            status: false,
            message: "Error at request validation",
            description: error
        });
    }
    let jobId = 0;
    try {
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
                verified_by: req.auth?.id,
            }
        });
        jobId = newJobPost.id;
        const salary = await index_1.default.client.salary.create({
            data: {
                id: newJobPost.id,
                low_end: req.body.low_end,
                high_end: req.body.high_end,
                periodicity: req.body.periodicity,
                currency: req.body.currency,
            }
        });
        res.send(lodash_1.default.merge(newJobPost, salary));
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
            ;
        }
        try {
            if (jobId != 0)
                await index_1.default.client.job_post.delete({
                    where: {
                        id: jobId
                    }
                });
        }
        catch (error) {
            console.log(error);
        }
        return res.status(400).json({
            status: false,
            message: "error while creating job post"
        });
    }
};
