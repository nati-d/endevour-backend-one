"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const response_1 = __importDefault(require("../types/response"));
const tokenAuth = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token)
        return res
            .status(401)
            .json(new response_1.default(false, "Access denied. Token not provided"));
    try {
        const decoded = jsonwebtoken_1.default.verify(token, "jwtprivatekey");
        req.auth = decoded;
        next();
    }
    catch (error) {
        return res
            .status(400)
            .json(new response_1.default(false, "Access denied. Invalid token"));
    }
};
exports.default = tokenAuth;
