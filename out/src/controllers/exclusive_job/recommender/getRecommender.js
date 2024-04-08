"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = __importDefault(require("../../../prisma/client/prismaClient"));
const response_1 = __importDefault(require("../../../types/response"));
const getRecommender = async (req, res) => {
    const { recommender_id } = req.params;
    try {
        const recommender = await prismaClient_1.default.recommender.findUnique({
            where: { id: Number(recommender_id) },
        });
        if (!recommender) {
            return res
                .status(404)
                .json(new response_1.default(false, "Recommender not found"));
        }
        return res
            .status(200)
            .json(new response_1.default(true, "Recommender fetched successfully.", recommender));
    }
    catch (error) {
        console.error("Error fetching recommender:", error);
        res.status(500).json(new response_1.default(false, "Error fetching recommender"));
    }
};
exports.default = getRecommender;
