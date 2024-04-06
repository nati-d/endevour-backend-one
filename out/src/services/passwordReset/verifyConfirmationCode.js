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
    const { email, code_id, code, new_password, type } = req.body;
    if (type !== "admin" && type !== "user")
        return res
            .status(400)
            .json(new response_1.default(false, "You inserted invalid type."));
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
        const salt = await bcrypt_1.default.genSalt(13);
        const hashedPassword = await bcrypt_1.default.hash(new_password, salt);
        let updatedUser;
        if (type === "admin") {
            updatedUser = await prismaClient_1.default.admin.update({
                data: {
                    password: hashedPassword,
                },
                where: {
                    email,
                },
            });
        }
        else {
            updatedUser = await prismaClient_1.default.user.update({
                where: {
                    email,
                },
                data: {
                    password: hashedPassword,
                },
            });
        }
        await prismaClient_1.default.password_reset.delete({
            where: {
                id: code_id,
            },
        });
        return res.status(201).json(new response_1.default(true, "Password rested successfully.", lodash_1.default.pickBy(updatedUser, (value, key) => key !== "password")));
    }
    catch (error) {
        return res
            .status(500)
            .json(new response_1.default(false, "Something went wrong please try again"));
    }
};
exports.default = verifyForgotPassword;
