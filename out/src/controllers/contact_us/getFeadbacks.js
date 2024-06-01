"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = __importDefault(require("../../prisma/client/prismaClient"));
const response_1 = __importDefault(require("../../types/response"));
const getFeadbacks = async (req, res) => {
    try {
        const feadbacks = await prismaClient_1.default.customer_feadbacks.findMany();
        return res
            .status(200)
            .json(new response_1.default(true, "Feadbacks getted successfully.", feadbacks));
    }
    catch (error) {
        console.log(error);
        return res
            .status(500)
            .json(new response_1.default(false, "Failed to get feadbacks.", null, error));
    }
};
exports.default = getFeadbacks;
