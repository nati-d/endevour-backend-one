"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = __importDefault(require("../../../prisma/client/prismaClient"));
const response_1 = __importDefault(require("../../../types/response"));
const validation_1 = __importDefault(require("../../../validation"));
const updateRecommender = async (req, res) => {
    const { error } = validation_1.default.recommender.Recommender.validate(req.body);
    if (error)
        return res.status(400).json(new response_1.default(false, error.message));
    const { recommender_id } = req.params;
    const { first_name, last_name, email } = req.body;
    try {
        const updatedRecommender = await prismaClient_1.default.recommender.update({
            where: { id: Number(recommender_id) },
            data: {
                first_name,
                last_name,
                email,
            },
        });
        return res.json(new response_1.default(true, "Recommender updated successfully.", updatedRecommender));
    }
    catch (error) {
        console.error("Error updating recommender:", error);
        res.status(500).json(new response_1.default(false, "Error updating recommender"));
    }
};
exports.default = updateRecommender;
