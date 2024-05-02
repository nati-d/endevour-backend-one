"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = __importDefault(require("../../../prisma/client/prismaClient"));
const response_1 = __importDefault(require("../../../types/response"));
const lodash_1 = __importDefault(require("lodash"));
const getRecommenders = async (req, res) => {
    try {
        const recommenders = await prismaClient_1.default.user.findMany({
            where: {
                is_recommender: true,
            },
        });
        return res.json(new response_1.default(true, "Recommenders getted successfully", recommenders.map((recommender) => lodash_1.default.pickBy(recommender, (value, key) => key !== "password"))));
    }
    catch (error) {
        console.error("Error fetching recommenders:", error);
        return res
            .status(500)
            .json(new response_1.default(false, "Error fetching recommenders", error));
    }
};
exports.default = getRecommenders;
