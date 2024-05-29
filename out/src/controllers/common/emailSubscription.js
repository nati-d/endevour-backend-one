"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = __importDefault(require("../../prisma/client/prismaClient"));
const response_1 = __importDefault(require("../../types/response"));
const joi_1 = __importDefault(require("joi"));
const client_1 = require("@prisma/client");
const ValidateSubscriber = joi_1.default.object({
    email: joi_1.default.string().email(),
    subscribe_for: joi_1.default.string().valid("All", "Tender", "Job"),
});
const emailSubscription = async (req, res) => {
    const { error } = ValidateSubscriber.validate(req.body);
    if (error)
        return res.status(400).json(new response_1.default(false, error.message));
    const { email, subscribe_for } = req.body;
    try {
        const addSubscriber = await prismaClient_1.default.email_subscribers.create({
            data: {
                email,
                subscribe_for,
            },
        });
        return res
            .status(200)
            .json(new response_1.default(true, "User subscribe for " + subscribe_for + " successfully.", addSubscriber));
    }
    catch (error) {
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2002")
                return res
                    .status(400)
                    .json(new response_1.default(false, "User already subscribed to " + subscribe_for, null, error));
        }
    }
};
exports.default = emailSubscription;
