"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = __importDefault(require("../../../prisma/client/prismaClient"));
const response_1 = __importDefault(require("../../../types/response"));
const verifyForgotPassword = async (req, res) => {
    const { email, code_id, code } = req.body;
    try {
        const getCode = await prismaClient_1.default.password_reset.findFirst({
            where: {
                id: code_id,
                email,
            },
        });
        if (!getCode || getCode.confirmation_code !== code)
            return res
                .status(400)
                .json(new response_1.default(false, "Invalide confirmation code."));
        await prismaClient_1.default.password_reset.update({
            where: {
                id: code_id,
                email,
            },
            data: {
                verified: true,
            },
        });
        return res
            .status(200)
            .json(new response_1.default(true, "Code confirmed!", { code_id: getCode.id }));
    }
    catch (error) {
        return res
            .status(500)
            .json(new response_1.default(false, "Something went wrong please try again"));
    }
};
exports.default = verifyForgotPassword;
