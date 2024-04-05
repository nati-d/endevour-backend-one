"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const response_1 = __importDefault(require("../../../types/response"));
const prismaClient_1 = __importDefault(require("../../../prisma/client/prismaClient"));
const createTenderFile = async (req, res) => {
    try {
        const { file, tender_id } = req.body;
        const createdFile = await prismaClient_1.default.tender_files.create({
            data: {
                file,
                tender_id,
            },
        });
        return res.json(new response_1.default(true, "Tender file created successfully", createdFile));
    }
    catch (error) {
        console.error("Error creating tender file:", error);
        return res
            .status(500)
            .json(new response_1.default(false, "Internal server error"));
    }
};
exports.default = createTenderFile;
