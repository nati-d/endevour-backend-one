"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = __importDefault(require("../../../prisma/client/prismaClient"));
const response_1 = __importDefault(require("../../../types/response"));
const createRecommendedApplicant = async (req, res) => {
    const { job_id, recommender_email, remark } = req.body;
    const cv = req.file?.filename;
    if (!cv)
        return res.status(400).json(new response_1.default(false, "CV not provided!"));
    try {
        const getJob = await prismaClient_1.default.exclusive_job.findUnique({
            where: {
                id: parseInt(job_id),
            },
        });
        if (!getJob)
            return res
                .status(404)
                .json(new response_1.default(false, "Job does not exist!"));
        if (new Date() > new Date(getJob.closing_date))
            return res
                .status(403)
                .json(new response_1.default(false, "The application date for this job is passed!"));
        const getRecommender = await prismaClient_1.default.user.findUnique({
            where: {
                email: recommender_email,
                is_recommender: true,
            },
        });
        if (!getRecommender)
            return res
                .status(404)
                .json(new response_1.default(false, "Recommender does not exist in the recommenders list!"));
        const isAuthorized = await prismaClient_1.default.user.findFirst({
            where: {
                id: getRecommender.id,
                exclusive_jobs: {
                    some: {
                        id: getJob.id,
                    },
                },
            },
        });
        if (!isAuthorized)
            return res
                .status(401)
                .json(new response_1.default(false, "You're not authorized to recommend for this job!"));
        const createdRecommendedApplicant = await prismaClient_1.default.recommended_applicant.create({
            data: {
                remark,
                cv,
                job: getJob.id,
                recommender: getRecommender.id,
            },
        });
        return res
            .status(201)
            .json(new response_1.default(true, "Recommendation completed successfully.", createdRecommendedApplicant));
    }
    catch (error) {
        console.log(error);
        return res
            .status(500)
            .json(new response_1.default(false, "Failed to record recommendation please try again!", null, error));
    }
};
exports.default = createRecommendedApplicant;
