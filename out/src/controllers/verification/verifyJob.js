"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = __importDefault(require("../../prisma/client/prismaClient"));
const response_1 = __importDefault(require("../../types/response"));
const jobPostVerification_1 = __importDefault(require("../../templates/jobPostVerification"));
const verifyJob = async (req, res, next) => {
    try {
        const { job_id } = req.params;
        const admin_id = req.auth.id;
        const selectJob = await prismaClient_1.default.job_post.findFirst({
            where: {
                id: parseInt(job_id),
                posted_by: { not: null },
                verified_by: null,
            },
        });
        if (!selectJob)
            return res
                .status(400)
                .json(new response_1.default(false, "Invalid data. Can't find job post with the provided data!"));
        const verifiedJob = await prismaClient_1.default.job_post.update({
            where: {
                id: parseInt(job_id),
            },
            data: {
                verified_by: admin_id,
            },
            include: {
                user: {
                    select: {
                        email: true,
                        first_name: true,
                        last_name: true,
                    },
                },
            },
        });
        if (!verifiedJob.user?.email)
            return;
        const template = (0, jobPostVerification_1.default)(`${verifiedJob.user.first_name + " " + verifiedJob.user.last_name}`);
        req.emailData = {
            sendTo: verifiedJob.user?.email,
            subject: "Job post verification",
            html: template,
            otherData: verifiedJob,
            resMessage: "Job verified successfully.",
            statusCode: 201,
            queryOnFail: async () => await prismaClient_1.default.job_post.update({
                where: {
                    id: parseInt(job_id),
                },
                data: {
                    verified_by: null,
                },
            }),
        };
        next();
    }
    catch (error) {
        return res
            .status(500)
            .json(new response_1.default(false, "Failed to verify job post", null, error));
    }
};
exports.default = verifyJob;
