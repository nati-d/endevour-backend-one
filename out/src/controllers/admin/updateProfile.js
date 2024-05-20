"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = __importDefault(require("../../prisma/client/prismaClient"));
const response_1 = __importDefault(require("../../types/response"));
const lodash_1 = __importDefault(require("lodash"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const updateProfile = async (req, res) => {
    try {
        const { first_name, last_name, phone_number, email } = req.body;
        const updatedAdmin = await prismaClient_1.default.admin.update({
            where: {
                id: parseInt(req.auth.id),
            },
            data: {
                first_name,
                last_name,
                phone_number,
                email,
            },
        });
        if (!updatedAdmin)
            return res
                .status(400)
                .json(new response_1.default(false, "Invalide credential."));
        const payload = lodash_1.default.pickBy(updatedAdmin, (_value, key) => key != "password");
        const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_KEY || "");
        return res.status(200).json(new response_1.default(true, "Admin updated successfully.", {
            token,
        }));
    }
    catch (error) { }
};
exports.default = updateProfile;
