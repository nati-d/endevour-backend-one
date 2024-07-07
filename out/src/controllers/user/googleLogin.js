"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../../prisma/"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cookie_1 = require("../../configs/cookie");
const response_1 = __importDefault(require("../../types/response"));
exports.default = async (req, res) => {
    let cookie = (await cookie_1.redisClient.get(`endevour:${req.sessionID}`));
    let cookie_ = JSON.parse(cookie);
    let user;
    try {
        user = await prisma_1.default.client.user.findFirst({
            where: {
                email: cookie_?.passport?.user?.email
            },
            select: {
                id: true,
                username: true,
                first_name: true,
                last_name: true,
                profile_image: true,
                created_at: true,
            }
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json(new response_1.default(false, 'error while processing request'));
    }
    try {
        const token = jsonwebtoken_1.default.sign(JSON.stringify(user), process.env.JWT_KEY);
        res.setHeader('authorization', token);
        res.redirect(process.env.FINAL_REDIRECT);
    }
    catch (error) {
        console.error(error);
        return res.status(400).json(new response_1.default(false, 'invalid token'));
    }
};
