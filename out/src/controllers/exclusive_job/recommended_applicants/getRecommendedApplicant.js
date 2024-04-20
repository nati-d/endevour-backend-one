"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = __importDefault(require("../../../prisma/client/prismaClient"));
const response_1 = __importDefault(require("../../../types/response"));
const getRecommendedApplicant = async (req, res) => {
    const { id } = req.params;
    try {
        const getApplicant = await prismaClient_1.default.recommended_applicant.findFirst({
            where: {
                id: parseInt(id),
            },
            include: {
                exclusive_job: true,
            },
        });
        if (!getApplicant)
            return res
                .status(404)
                .json(new response_1.default(false, "Recommended applicant not found!"));
        return res
            .status(200)
            .json(new response_1.default(true, "Applicant getted successfully.", getApplicant));
    }
    catch (error) {
        console.log(error);
        return res
            .status(500)
            .json(new response_1.default(false, "Failed to load applicant please try again", null, error));
    }
};
exports.default = getRecommendedApplicant;
