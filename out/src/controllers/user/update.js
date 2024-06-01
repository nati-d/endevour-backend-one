"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = __importDefault(require("../../prisma/client/prismaClient"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const index_1 = __importDefault(require("../../validation/index"));
const response_1 = __importDefault(require("../../types/response"));
exports.default = async (req, res) => {
    let { error } = index_1.default.user.update.validate(req.body);
    if (error)
        return res.status(400).send(new response_1.default(false, "Invalid value set", error.details));
    let user;
    try {
        user = await prismaClient_1.default.user.update({
            where: { id: req.auth.id },
            data: {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                phone_number: req.body.phone_number,
                location: req.body.location,
            },
            select: {
                id: true,
                username: true,
                first_name: true,
                last_name: true,
                email: true,
                phone_number: true,
                profile_image: true,
                location: true,
                verified_by: true,
                created_at: true,
                updated_at: true
            }
        });
    }
    catch (error) {
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2001") {
                return res.status(404).json(new response_1.default(false, "User not found", error));
            }
        }
        return res.status(500).json(new response_1.default(false, "Unknown error while updating user", error));
    }
    const token = jsonwebtoken_1.default.sign(user, process.env.JWT_KEY || "");
    return res.header('authorization', token).status(200).json(new response_1.default(true, "User updated successfully", user));
};
