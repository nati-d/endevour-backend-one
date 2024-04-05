"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = __importDefault(require("../../prisma/client/prismaClient"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const response_1 = __importDefault(require("../../types/response"));
const confirmPassword = async (req, res) => {
    const id = req.auth?.id;
    const password = req.query.password;
    console.log(password, id);
    try {
        const getAdmin = await prismaClient_1.default.admin.findFirst({
            where: {
                id,
            },
        });
        if (getAdmin) {
            const checkPassword = await bcrypt_1.default.compare(password, getAdmin.password);
            if (checkPassword) {
                return res
                    .status(200)
                    .json(new response_1.default(true, "Password confirmed."));
            }
            else {
                return res
                    .status(400)
                    .json(new response_1.default(false, "The requested password is invalid."));
            }
        }
    }
    catch (error) {
        console.log(error);
        return res
            .status(500)
            .json(new response_1.default(false, "Error while trying to confirm password please tyy again."));
    }
};
exports.default = confirmPassword;
