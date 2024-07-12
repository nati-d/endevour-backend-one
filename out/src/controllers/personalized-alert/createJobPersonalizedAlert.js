"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = __importDefault(require("../../prisma/client/prismaClient"));
const response_1 = __importDefault(require("../../types/response"));
const createJobPersonalizedAlert = async (req, res) => {
    try {
        const { name, repetition } = req.body;
        const userId = req.auth.id;
        const createAlert = await prismaClient_1.default.personalized_alerts.create({
            data: {
                name,
                repetition,
                user_id: userId,
                alert_for: "job",
            },
        });
        return res
            .status(201)
            .json(new response_1.default(true, "Personalized alert for job created successfully.", createAlert));
    }
    catch (error) {
        console.log(error);
        return res
            .status(500)
            .json(new response_1.default(false, "Failed while inserting personaliezed alert for job", null, error));
    }
};
exports.default = createJobPersonalizedAlert;
