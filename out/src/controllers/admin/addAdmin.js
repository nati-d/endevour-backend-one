"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = __importDefault(require("../../prisma/client/prismaClient"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const admin_1 = require("../../validation/admin");
const lodash_1 = __importDefault(require("lodash"));
const response_1 = __importDefault(require("../../types/response"));
const addAdmin = async (req, res) => {
    const body = req.body;
    const { error } = admin_1.newAdmin.validate(req.body);
    if (error)
        return res.status(400).json({ success: false, message: error.message });
    try {
        const getAdmin = await prismaClient_1.default.admin.findUnique({
            where: {
                email: body.email,
            },
        });
        if (getAdmin) {
            return res.status(400).json({
                success: false,
                message: "Admin already exist with this email.",
                data: null,
            });
        }
        else {
            const salt = await bcrypt_1.default.genSalt(13);
            const hashedPassword = await bcrypt_1.default.hash(body.password, salt);
            const createdAdmin = await prismaClient_1.default.admin.create({
                data: {
                    first_name: body.first_name,
                    last_name: body.last_name,
                    email: body.email,
                    phone_number: body.phone_number,
                    password: hashedPassword,
                    role: body.role,
                },
            });
            return res.status(201).json(new response_1.default(true, "Admin added successfully", lodash_1.default.pickBy(createdAdmin, (value, key) => key !== "password")));
        }
    }
    catch (error) {
        console.log(error);
        return res.status(501).json({
            success: false,
            message: error,
        });
    }
};
exports.default = addAdmin;
