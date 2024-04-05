"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = __importDefault(require("../../prisma/client/prismaClient"));
const response_1 = __importDefault(require("../../types/response"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const lodash_1 = __importDefault(require("lodash"));
const verifyForgotPassword = async (req, res) => {
    const admin_id = req.body?.admin_id;
    const codeId = req.body.code_id;
    const code = req.body.confirmation_code;
    const newPassword = req.body.new_password;
    try {
        const checkCode = await prismaClient_1.default.admin_pass_reset.findFirst({
            where: {
                id: codeId,
                admin_id,
            },
        });
        if (!checkCode || checkCode.confirmation_code !== code)
            return res
                .status(400)
                .json(new response_1.default(false, "Invalide confirmation code."));
        const salt = await bcrypt_1.default.genSalt(13);
        const hashedPassword = await bcrypt_1.default.hash(newPassword, salt);
        const updatedAdmin = await prismaClient_1.default.admin.update({
            data: {
                password: hashedPassword,
            },
            where: {
                id: admin_id,
            },
        });
        return res.status(201).json(new response_1.default(true, "Password rested successfully.", lodash_1.default.pickBy(updatedAdmin, (value, key) => key !== "password")));
    }
    catch (error) {
        return res
            .status(500)
            .json(new response_1.default(false, "Something went wrong please try again"));
    }
};
exports.default = verifyForgotPassword;
