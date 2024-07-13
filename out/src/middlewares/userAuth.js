"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const response_1 = __importDefault(require("../types/response"));
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
};
exports.default = authMiddleware;
