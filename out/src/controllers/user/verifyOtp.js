"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../../prisma/"));
const response_1 = __importDefault(require("../../types/response"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.default = async (req, res) => {
    let userotp;
    let user;
    try {
        userotp = await prisma_1.default.client.user_otps.findFirst({
            where: { email: req.body.email },
        });
        if (!userotp)
            return res
                .status(404)
                .json(new response_1.default(false, "no otpcode for the email provided"));
    }
    catch (error) {
        console.error(error);
        return res
            .status(500)
            .json(new response_1.default(false, "error while processing request"));
    }
    try {
        if (userotp.otp_code != req.body.otp_code)
            return res
                .status(401)
                .json(new response_1.default(false, "invalid email or code"));
    }
    catch (error) {
        console.error(error);
        return res
            .status(500)
            .json(new response_1.default(false, "error while processing request"));
    }
    try {
        await prisma_1.default.client.user_otps.update({
            where: { email: req.body.email },
            data: {
                valid: true,
            },
        });
        user = await prisma_1.default.client.user.findFirst({
            where: {
                email: req.body.email,
            },
            include: {
                exclusive_jobs: true,
            },
        });
    }
    catch (error) {
        console.error(error);
        return res
            .status(500)
            .json(new response_1.default(false, "error while processing request"));
    }
    user.is_admin = false;
    delete user.password;
    const token = jsonwebtoken_1.default.sign(user, process.env.JWT_KEY || "");
    return res
        .status(200)
        .json(new response_1.default(true, "email has been verified", token));
};
