"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = __importDefault(require("../../prisma/client/prismaClient"));
const lodash_1 = __importDefault(require("lodash"));
const response_1 = __importDefault(require("../../types/response"));
const admin_1 = require("../../validation/admin");
const getAdmins = async (req, res) => {
    const { error } = admin_1.adminRole.validate(req.query);
    if (error)
        return res.status(400).json(new response_1.default(false, "Invalide role query"));
    const role = req.query.role;
    try {
        const getAdmins = await prismaClient_1.default.admin.findMany({
            where: {
                role,
            },
        });
        const passwordRemoved = getAdmins.map((element) => lodash_1.default.pickBy(element, (value, key) => key !== "password"));
        return res
            .status(200)
            .json(new response_1.default(true, "Admins retrieved successfully.", passwordRemoved));
    }
    catch (error) {
        return res
            .status(500)
            .json(new response_1.default(false, "Error while retrieving admins. please try again!"));
    }
};
exports.default = getAdmins;
