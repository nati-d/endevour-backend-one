"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const superAdminAuth = async (req, res, next) => {
    if (req.auth?.role !== "SUPER_ADMIN")
        return res
            .status(403)
            .json({ success: false, message: "Access denied. lack super admin." });
    next();
};
exports.default = superAdminAuth;
