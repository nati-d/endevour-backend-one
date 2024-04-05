"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const adminAuth = async (req, res, next) => {
    if (!req.auth?.role)
        return res
            .status(403)
            .json({ success: false, message: "Access denied. lack admin" });
    next();
};
exports.default = adminAuth;
