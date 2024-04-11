"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const response_1 = __importDefault(require("../../../types/response"));
const hashPassword_1 = __importDefault(require("../../../helpers/hashPassword"));
const prismaClient_1 = __importDefault(require("../../../prisma/client/prismaClient"));
const lodash_1 = __importDefault(require("lodash"));
const changePassword = async (req, res) => {
    const { email, code_id, new_password, type } = req.body;
    if (type !== "admin" && type !== "user")
        return res
            .status(400)
            .json(new response_1.default(false, "You inserted invalid type."));
    try {
        const getCode = await prismaClient_1.default.password_reset.findFirst({
            where: {
                id: code_id,
                email,
                verified: true,
            },
        });
        if (!getCode)
            return res
                .status(400)
                .json(new response_1.default(false, "Invalide cridentials!"));
        const hashedPassword = await (0, hashPassword_1.default)(new_password);
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
        console.log(error);
        return res
            .status(500)
            .json(new response_1.default(false, "Something went wrong while  resetting password please try again!"));
    }
};
exports.default = changePassword;
