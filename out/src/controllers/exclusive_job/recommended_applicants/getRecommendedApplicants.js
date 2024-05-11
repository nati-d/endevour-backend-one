"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = __importDefault(require("../../../prisma/client/prismaClient"));
const response_1 = __importDefault(require("../../../types/response"));
const getRecommendedApplicants = async (req, res) => {
    const { job_id, page } = req.query;
    const applicantsPerpage = 10;
    try {
        const totalApplicnats = await prismaClient_1.default.recommended_applicant.count({
            where: {
                job: job_id ? parseInt(job_id?.toString()) : undefined,
            },
        });
        const numberOfPages = Math.ceil(totalApplicnats / applicantsPerpage);
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
            .json(new response_1.default(true, "Applicants for this job getted successfully. ", {
            applicants: getApplicants,
            totalPages: numberOfPages,
            currentPage: Number(page),
            nextPage: page && parseInt(page?.toString()) < numberOfPages
                ? parseInt(page.toString()) + 1
                : null,
        }));
    }
    catch (error) {
        console.log(error);
        return res
            .status(500)
            .json(new response_1.default(false, "Failed to get applicants! please try again", null, undefined));
    }
};
exports.default = getRecommendedApplicants;
