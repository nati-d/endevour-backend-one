"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = __importDefault(require("../../prisma/client/prismaClient"));
const response_1 = __importDefault(require("../../types/response"));
const getExclusiveJob = async (req, res) => {
    const { id } = req.params;
    try {
        const getJob = await prismaClient_1.default.exclusive_job.findFirst({
            where: {
                id: parseInt(id),
            },
            include: {
                recommended_applicants: true,
                user: true,
            },
        });
        if (!getJob)
            return res
                .status(404)
                .json(new response_1.default(false, "Excluseve job not found!"));
        return res
            .status(200)
            .json(new response_1.default(true, "Job getted successfully.", getJob));
    }
    catch (error) {
        console.log(error);
        return res
            .status(500)
            .json(new response_1.default(false, "Failed to get job please try again!", null, error));
    }
};
exports.default = getExclusiveJob;
