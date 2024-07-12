"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = __importDefault(require("../../prisma/client/prismaClient"));
const response_1 = __importDefault(require("../../types/response"));
const getPersonalizedAlert = async (req, res) => {
    try {
        const { alert_for } = req.query;
        const userId = req.auth.id;
        const getAlerts = await prismaClient_1.default.personalized_alerts.findMany({
            where: {
                user_id: userId,
                alert_for: alert_for?.toString(),
            },
        });
        return res
            .status(200)
            .json(new response_1.default(true, "Pesonalized alert getted successfully.", getAlerts));
    }
    catch (error) {
        console.log(error);
        return res
            .status(500)
            .json(new response_1.default(false, "Failed to get personalized alerts", null, error));
    }
};
exports.default = getPersonalizedAlert;
