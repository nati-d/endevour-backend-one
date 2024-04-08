"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = __importDefault(require("../../../prisma/client/prismaClient"));
const response_1 = __importDefault(require("../../../types/response"));
const deleteRecommender = async (req, res) => {
    const { recommender_id } = req.params;
    try {
        await prismaClient_1.default.recommender.delete({
            where: { id: Number(recommender_id) },
        });
        return res.status(204).end();
    }
    catch (error) {
        console.error("Error deleting recommender:", error);
        res.status(500).json(new response_1.default(false, "Error deleting recommender"));
    }
};
exports.default = deleteRecommender;
