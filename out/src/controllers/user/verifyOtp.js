"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../../prisma/"));
const response_1 = __importDefault(require("../../types/response"));
exports.default = async (req, res) => {
    let userotp;
    let otpCode;
    try {
        userotp = await prisma_1.default.client.user_otps.findFirst({
            where: { email: req.body.email }
        });
        if (!userotp)
            return res.status(404).json(new response_1.default(false, "no otpcode for the email provided"));
    }
    catch (error) {
        console.error(error);
        return res.status(500).json(new response_1.default(false, "error while processing request"));
    }
    try {
        if (userotp.otp_code != req.body.otp_code)
            return res.status(401).json(new response_1.default(false, "invalid email or code"));
    }
    catch (error) {
        console.error(error);
        return res.status(500).json(new response_1.default(false, "error while processing request"));
    }
    try {
        await prisma_1.default.client.user_otps.update({
            where: { email: req.body.email },
            data: {
                valid: true
            }
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json(new response_1.default(false, "error while processing request"));
    }
    return res.status(200).json(new response_1.default(true, "email has been verified"));
};
