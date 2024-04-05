"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = __importDefault(require("../../../prisma/client/prismaClient"));
const response_1 = __importDefault(require("../../../types/response"));
const getTenderFiles = async (req, res) => {
    try {
        const files = await prismaClient_1.default.tender_files.findMany();
        return res.json(new response_1.default(true, "Tender files fetched successfully", files));
    }
    catch (error) {
        console.error("Error fetching tender files:", error);
        return res
            .status(500)
            .json(new response_1.default(false, "Internal server error"));
    }
};
exports.default = getTenderFiles;
