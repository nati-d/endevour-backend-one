"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = __importDefault(require("../../../prisma/client/prismaClient"));
const response_1 = __importDefault(require("../../../types/response"));
const getRecommendedApplicants = async (req, res) => {
    const { job_id } = req.query;
    try {
        const getApplicants = await prismaClient_1.default.recommended_applicant.findMany({
            where: {
                job: job_id ? parseInt(job_id?.toString()) : undefined,
            },
            include: {
                exclusive_job: true,
            },
        });
        return res
            .status(200)
            .json(new response_1.default(true, "Applicans for this job: ", getApplicants));
    }
    catch (error) {
        console.log(error);
        return res
            .status(500)
            .json(new response_1.default(false, "Failed to get applicants! please try again"));
    }
};
exports.default = getRecommendedApplicants;
