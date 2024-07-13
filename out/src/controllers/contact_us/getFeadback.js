"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = __importDefault(require("../../prisma/client/prismaClient"));
const response_1 = __importDefault(require("../../types/response"));
const getFeadback = async (req, res) => {
    try {
        const { feadback_id } = req.params;
        const feadback = await prismaClient_1.default.customer_feadbacks.findFirst({
            where: {
                id: parseInt(feadback_id),
            },
        });
        if (!feadback)
            return res.status(404).json(new response_1.default(false, "Feadback not found"));
        return res
            .status(200)
            .json(new response_1.default(true, "Feadback getted successfully.", feadback));
    }
    catch (error) {
        console.log(error);
        return res
            .status(500)
            .json(new response_1.default(false, "Failed to get feadback please try again", null, error));
    }
};
exports.default = getFeadback;
