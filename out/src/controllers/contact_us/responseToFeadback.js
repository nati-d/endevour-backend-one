"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = __importDefault(require("../../prisma/client/prismaClient"));
const response_1 = __importDefault(require("../../types/response"));
const responseToFeadback = async (req, res, next) => {
    try {
        const { feadback_id, subject, body } = req.body;
        const feadback = await prismaClient_1.default.customer_feadbacks.findFirst({
            where: {
                id: parseInt(feadback_id),
            },
        });
        if (!feadback)
            return res
                .status(404)
                .json(new response_1.default(false, "Feadback not found!"));
        req.emailData = {
            sendTo: feadback.email,
            subject,
            html: body,
            resMessage: "Response sent successfully.",
        };
        next();
    }
    catch (error) {
        console.log(error);
        return res
            .status(500)
            .json(new response_1.default(false, "Failed to send response please try again"));
    }
};
exports.default = responseToFeadback;
