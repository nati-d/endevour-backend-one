"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const response_1 = __importDefault(require("../../types/response"));
const prismaClient_1 = __importDefault(require("../../prisma/client/prismaClient"));
const saveTender = async (req, res) => {
    try {
        const { tender_id } = req.body;
        const user_id = req.auth.id;
        if (!Number.isInteger(tender_id))
            return res
                .status(400)
                .json(new response_1.default(false, "Invalide tender id."));
        const savedTender = await prismaClient_1.default.saved_tender.create({
            data: {
                tender: tender_id,
                user: user_id,
            },
        });
        return res
            .status(201)
            .json(new response_1.default(true, "Tender created successfully.", savedTender));
    }
    catch (error) {
        console.log(error);
        return res
            .status(500)
            .json(new response_1.default(false, "Failed to save tender please try again", null, error));
    }
};
exports.default = saveTender;
