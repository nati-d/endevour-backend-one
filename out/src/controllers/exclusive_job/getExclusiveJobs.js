"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = __importDefault(require("../../prisma/client/prismaClient"));
const response_1 = __importDefault(require("../../types/response"));
const getExclusiveJobs = async (req, res) => {
    const { page } = req.query;
    const jobsPerPage = 10;
    try {
        const totalJobs = await prismaClient_1.default.exclusive_job.count();
        const getJobs = await prismaClient_1.default.exclusive_job.findMany({
            skip: page ? (parseInt(page?.toString()) - 1) * jobsPerPage : undefined,
            take: page ? jobsPerPage : undefined,
        });
        return res.status(200).json(new response_1.default(true, "Jobs getted successfully.", {
            jobs: getJobs,
            totalPage: Math.ceil(totalJobs / jobsPerPage),
            currentPage: page,
            nextPage: page &&
                parseInt(page?.toString()) < Math.ceil(totalJobs / jobsPerPage)
                ? parseInt(page.toString()) + 1
                : null,
        }));
    }
    catch (error) {
        console.log(error);
        return res
            .status(500)
            .json(new response_1.default(false, "Failed to get jobs! Please try again", null, error));
    }
};
exports.default = getExclusiveJobs;
