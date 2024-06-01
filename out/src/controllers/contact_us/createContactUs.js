"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const response_1 = __importDefault(require("../../types/response"));
const prismaClient_1 = __importDefault(require("../../prisma/client/prismaClient"));
const validateFeadback = joi_1.default.object({
    full_name: joi_1.default.string().min(2).required(),
    email: joi_1.default.string().email().email(),
    subject: joi_1.default.string().required(),
    message: joi_1.default.string().required(),
});
const createContactUs = async (req, res) => {
    const { error } = validateFeadback.validate(req.body);
    if (error)
        return res.status(200).json(new response_1.default(false, error.message));
    const { full_name, email, subject, message } = req.body;
    try {
        const addFeadback = await prismaClient_1.default.customer_feadbacks.create({
            data: {
                full_name,
                email,
                subject,
                message,
            },
        });
        return res
            .status(201)
            .json(new response_1.default(true, "Feadback registered successfully.", addFeadback));
    }
    catch (error) {
        console.log(error);
        return res
            .status(500)
            .json(new response_1.default(false, "Failed to register feadback please try again."));
    }
};
exports.default = createContactUs;
