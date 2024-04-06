"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = __importDefault(require("../../prisma/client/prismaClient"));
const response_1 = __importDefault(require("../../types/response"));
const getTenders = async (req, res) => {
    try {
        const tenders = await prismaClient_1.default.tender.findMany({
            include: {
                files: true,
            },
        });
        return res
            .status(200)
            .json(new response_1.default(true, "Tenders getted successfully.", tenders));
    }
    catch (error) {
        console.log(error);
        return res
            .status(500)
            .json(new response_1.default(false, "Something went wrong while getting tendrs."));
    }
};
exports.default = getTenders;
