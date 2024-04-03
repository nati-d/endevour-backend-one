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
exports.default = async (req, res) => {
    try {
        let { error } = index_1.default.user.userSignupSchema.validate(req.body);
        if (error) {
            return res.status(400).send({
                status: false,
                message: "Invalid value set",
                description: error.details,
            });
        }
    }
    catch (error) {
        return res.status(400).send({
            status: false,
            message: "Error at request validation",
            description: error,
        });
    }
    try {
        req.body.password = await bcrypt_1.default.hash(req.body.password, 10);
    }
    catch (error) {
        console.error(error);
        return res.status(500).send({
            status: false,
            message: "Internal server error",
            description: error,
        });
    }
    let newUser;
    try {
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
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError &&
            error.code === "P2002") {
            return res.status(400).json({
                status: false,
                message: "Duplicate entry for email or phone number",
                error: error,
            });
        }
        console.error("Error inserting user:", error);
        return res.status(500).send({
            status: false,
            message: "Unknown error at registering user",
            error: error,
        });
    }
    try {
        const token = jsonwebtoken_1.default.sign(newUser, process.env.JWT_KEY);
        return res.status(201).json({
            status: true,
            message: "User registered successfully",
            token: token,
        });
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
