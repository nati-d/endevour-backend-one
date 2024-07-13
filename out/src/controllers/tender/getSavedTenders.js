"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = __importDefault(require("../../prisma/client/prismaClient"));
const response_1 = __importDefault(require("../../types/response"));
const getSavedTenders = async (req, res) => {
    try {
        const userId = req.auth.id;
        const savedTenders = await prismaClient_1.default.saved_tender.findFirst({
            where: {
                user: userId,
            },
            include: {
                tender_: true,
            },
        });
        return res
            .status(200)
            .json(new response_1.default(false, "Saved tenders getted successfully.", savedTenders));
    }
    catch (error) {
        console.log(error);
        return res
            .status(500)
            .json(new response_1.default(false, "Failed to get saved tenders please try again!", null, error));
    }
};
exports.default = getSavedTenders;
