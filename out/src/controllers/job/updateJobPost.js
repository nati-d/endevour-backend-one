"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../../prisma/index"));
const client_1 = require("@prisma/client");
const lodash_1 = __importDefault(require("lodash"));
const index_2 = __importDefault(require("../../validation/index"));
const response_1 = __importDefault(require("../../types/response"));
exports.default = async (req, res) => {
    const { error } = index_2.default.job.updateJobPost.validate(req.body);
    if (error) {
        return res.status(400).json(new response_1.default(false, "unidentified request content", error.details));
    }
    let updatedJobPost;
    let updatedJobPostSalary;
    try {
        if (req?.auth?.role == "ADMIN" || req?.auth?.role == "SUPER_ADMIN") {
            updatedJobPost = await index_1.default.client.job_post.update({
                where: { id: req.body.id },
                data: {
                    title: req.body.title,
                    overview: req.body.overview,
                    body: req.body.body,
                    contract_type: req.body.contract_type,
                    year_of_experience: req.body.year_of_experience,
                    category: req.body.category,
                    closing_date: new Date(req.body.closing_date),
                }
            });
            updatedJobPostSalary = await index_1.default.client.salary.update({
                where: { id: req.body.id },
                data: {
                    low_end: req.body.low_end,
                    high_end: req.body.high_end,
                    periodicity: req.body.periodicity,
                    currency: req.body.currency,
                }
            });
        }
        res.status(201).json(new response_1.default(true, "Job post updated successfully", lodash_1.default.merge(updatedJobPost, updatedJobPostSalary)));
    }
    catch (error) {
        console.error("Error while updating job post:", error);
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2022")
                return res.status(403).json(new response_1.default(false, "not authorized to post blogs", error));
            if (error.code === "P2016")
                return res.status(404).json(new response_1.default(false, "resource to be updated not found", error));
        }
        res.status(500).json(new response_1.default(false, "Unknown error at updating job post", error));
    }
};
