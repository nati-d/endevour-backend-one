"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = __importDefault(require("../prisma"));
const response_1 = __importDefault(require("../types/response"));
const cookie_1 = require("../configs/cookie");
const cookie_2 = __importDefault(require("cookie"));
const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        try {
            const decodedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_KEY);
            req.userAuth = decodedToken;
            next();
            return;
        }
        catch (error) {
            return res.status(401).json(new response_1.default(false, "unauthorized user"));
        }
    }
    let user = req.user;
    try {
        let cached_ = (await cookie_1.redisClient.get(`endevour:${req.sessionID}`));
        let cached = JSON.parse(cached_);
        console.log('**cached: ', cached);
        const sessionId = req.sessionID;
        if (!sessionId) {
            return res.redirect('/auth/google');
        }
        user = await prisma_1.default.client.user.findFirst({
            where: {
                email: user?.email
            }
        });
        if (!user) {
            return res.status(401).redirect('/auth/google');
        }
    }
    catch (error) {
        console.error(error);
        return res.status(401).redirect('/auth/google');
    }
    const newToken = jsonwebtoken_1.default.sign(user, process.env.JWT_KEY);
    res.setHeader('authorization', newToken);
    res.setHeader('Set-Cookie', cookie_2.default.serialize('XSRF-TOKEN', "loggeg_in", {
        sameSite: 'lax',
        httpOnly: process.env.ENV !== 'development',
        path: '/',
        secure: process.env.ENV !== 'development',
        maxAge: 60 * 60 * 24 * 7 * 52,
        domain: process.env.COOKIE_DOMAIN,
    }));
    req.userAuth = user;
    next();
};
exports.default = authMiddleware;
