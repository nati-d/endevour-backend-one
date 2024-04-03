"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const tokenAuth = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token)
        return res
            .status(401)
            .json({ success: false, message: "Access denied. Token not provided" });
    try {
        const decoded = jsonwebtoken_1.default.verify(token, "jwtprivatekey");
        req.body.auth = decoded;
        next();
    }
    catch (error) {
        console.log(error);
        res
            .status(400)
            .json({ success: false, message: "Access denied. Invalid token" });
    }
};
exports.default = tokenAuth;
