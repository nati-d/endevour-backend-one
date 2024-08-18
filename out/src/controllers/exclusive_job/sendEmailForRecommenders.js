"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = __importDefault(require("../../prisma/client/prismaClient"));
const response_1 = __importDefault(require("../../types/response"));
const recommendForJob_1 = __importDefault(require("../../templates/recommendForJob"));
const sendEmailForRecommenders = async (req, res, next) => {
    try {
        const { recommenders_id, job_id } = req.body;
        const updatedExclusiveJob = await prismaClient_1.default.exclusive_job.update({
            where: {
                id: job_id,
            },
            data: {
                user: {
                    connect: recommenders_id,
                },
            },
        });
        const mapedIds = recommenders_id.map((user) => user.id);
        const recommendersEmail = await prismaClient_1.default.user.findMany({
            where: {
                id: {
                    in: mapedIds,
                },
                is_recommender: true,
            },
            select: {
                email: true,
            },
        });
        const joinedEmails = recommendersEmail
            .map((recommender) => recommender.email)
            .join(", ");
        req.emailData = {
            sendTo: joinedEmails,
            subject: "Recommend user for the above job",
            html: (0, recommendForJob_1.default)(updatedExclusiveJob.description, `https://www.endevour.org/jobs/recommend/${updatedExclusiveJob.id}`),
            queryOnFail: async () => await prismaClient_1.default.exclusive_job.update({
                where: {
                    id: job_id,
                },
                data: {
                    user: {
                        disconnect: recommenders_id,
                    },
                },
            }),
        };
        next();
    }
    catch (error) {
        console.log(error);
        return res
            .status(500)
            .json(new response_1.default(false, "Failed to send emailes for the given recommenders please try later!", null, error));
    }
};
exports.default = sendEmailForRecommenders;
