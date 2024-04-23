"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = __importDefault(require("../../prisma/client/prismaClient"));
const response_1 = __importDefault(require("../../types/response"));
const createExclusiveJob = async (req, res, next) => {
    if (!req.auth)
        return;
    const { description, recommenders_id, closing_date } = req.body;
    const verifiedBy = req.auth?.id;
    try {
        const createdExclusiveJob = await prismaClient_1.default.exclusive_job.create({
            data: {
                description,
                verified_by: verifiedBy,
                closing_date,
                recommenders: {
                    connect: recommenders_id,
                },
            },
        });
        const recommenders = await prismaClient_1.default.exclusive_job.findUnique({
            where: { id: createdExclusiveJob.id },
            include: {
                recommenders: true,
            },
        });
        const recommendersEmail = recommenders?.recommenders
            .map((recommender) => recommender.email)
            .join(", ");
        req.emailData = {
            sendTo: recommendersEmail ? recommendersEmail : "",
            subject: "Recommend your best for the best.",
            html: createdExclusiveJob.description +
                `<a href='https://endevour.org/exclusive-job/recommend?job_id=${createdExclusiveJob.id}'></a>`,
            otherData: createdExclusiveJob,
            queryOnFail: async () => await prismaClient_1.default.exclusive_job.delete({
                where: {
                    id: createdExclusiveJob.id,
                },
            }),
        };
        next();
    }
    catch (error) {
        console.log(error);
        console.log(error);
        return res
            .status(500)
            .json(new response_1.default(false, "Failed to create exclusive job please try again."));
    }
};
exports.default = createExclusiveJob;
