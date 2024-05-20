"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const response_1 = __importDefault(require("../../types/response"));
const prismaClient_1 = __importDefault(require("../../prisma/client/prismaClient"));
const lodash_1 = __importDefault(require("lodash"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const modifyRole = async (req, res) => {
    try {
        const { role } = req.body;
        if (role != "ADMIN" && role != "SUPER_ADMIN")
            return res
                .status(400)
                .json(new response_1.default(false, "Invalide role please select valide role"));
        const updateAdminRole = await prismaClient_1.default.admin.update({
            data: {
                role,
            },
            where: {
                id: parseInt(req.auth.id),
            },
        });
        if (!updateAdminRole)
            return res
                .status(404)
                .json(new response_1.default(false, "Can't find admin with specifide id."));
        const payload = lodash_1.default.pickBy(updateAdminRole, (_value, key) => key != "password");
        const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_KEY || "");
        return res.status(200).json(new response_1.default(true, "Admin role updated successfully!", {
            token,
        }));
    }
    catch (error) { }
};
exports.default = modifyRole;
