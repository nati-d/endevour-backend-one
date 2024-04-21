"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = __importDefault(require("../../prisma/client/prismaClient"));
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const index_1 = __importDefault(require("../../validation/index"));
const response_1 = __importDefault(require("../../types/response"));
exports.default = async (req, res) => {
    let { error } = index_1.default.user.userSignupSchema.validate(req.body);
    if (error)
        return res.status(400).send(new response_1.default(false, "Invalid value set", error.details));
    let newUser;
    try {
        req.body.password = await bcrypt_1.default.hash(req.body.password, 10);
        const { first_name, last_name, email, phone_number, location, password } = req.body;
        newUser = await prismaClient_1.default.user.create({
            data: {
                first_name,
                last_name,
                email,
                phone_number,
                location: {
                    x: location.x,
                    y: location.y,
                },
                password,
            },
        });
    }
    catch (error) {
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2002") {
                return res.status(400).json(new response_1.default(false, "Duplicate entry for email or phone number", error));
            }
        }
        return res.status(500).json(new response_1.default(false, "Unknown error at registering user", error));
    }
    try {
        newUser.password;
        const token = jsonwebtoken_1.default.sign(newUser, process.env.JWT_KEY);
        return res.header('authorization', token).status(201).json(new response_1.default(true, "User registered successfully", newUser));
    }
    catch (error) {
        console.error("Error signing JWT token:", error);
        return res.status(500).send({
            status: false,
            message: "Error signing JWT token",
            error: error,
        });
    }
};
