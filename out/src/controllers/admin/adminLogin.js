"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const admin_1 = require("../../validation/admin");
const prismaClient_1 = __importDefault(require("../../prisma/client/prismaClient"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const lodash_1 = __importDefault(require("lodash"));
const adminLogin = async (req, res) => {
    const { error } = admin_1.login.validate(req.body);
    if (error)
        return res.status(400).json({ success: false, message: error.message });
    try {
        const getAdmin = await prismaClient_1.default.admin.findUnique({
            where: {
                email: req.body.email,
            },
        });
        if (!getAdmin)
            return res
                .status(400)
                .json({ success: false, message: "Invalide credential." });
        const decodedPassword = await bcrypt_1.default.compare(req.body.password, getAdmin.password);
        if (!decodedPassword) {
            return res.status(400).json({
                success: false,
                message: "Invalide credentail",
            });
        }
        else {
            const payload = lodash_1.default.pickBy(getAdmin, (_value, key) => key !== "password");
            const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_KEY || "");
            return res
                .status(200)
                .json({ success: true, message: "Logged in successfully.", token });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(501).json({ success: false, message: error });
    }
};
exports.default = adminLogin;
