"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = __importDefault(require("../../../prisma/client/prismaClient"));
const response_1 = __importDefault(require("../../../types/response"));
const lodash_1 = __importDefault(require("lodash"));
const getRecommender = async (req, res) => {
    const { recommender_id } = req.params;
    try {
        const recommender = await prismaClient_1.default.user.findUnique({
            where: { id: Number(recommender_id), is_recommender: true },
            include: {
                exclusive_jobs: true,
            },
        });
        if (!recommender) {
            return res
                .status(404)
                .json(new response_1.default(false, "Recommender not found"));
        }
        return res.status(200).json(new response_1.default(true, "Recommender fetched successfully.", lodash_1.default.pickBy(recommender, (value, key) => key !== "password")));
    }
    catch (error) {
        console.error("Error fetching recommender:", error);
        res.status(500).json(new response_1.default(false, "Error fetching recommender"));
    }
};
exports.default = getRecommender;
