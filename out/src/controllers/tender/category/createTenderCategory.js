"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = __importDefault(require("../../../prisma/client/prismaClient"));
const response_1 = __importDefault(require("../../../types/response"));
const createTenderCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const adminId = req.auth?.id;
        if (adminId) {
            const createdCategory = await prismaClient_1.default.tender_category.create({
                data: {
                    name,
                    verified_by: adminId,
                },
            });
            res
                .status(201)
                .json(new response_1.default(true, "Tender category created successfully.", createdCategory));
        }
    }
    catch (error) {
        console.log(error);
        res
            .status(500)
            .json(new response_1.default(false, "Unable to create tender category"));
    }
};
exports.default = createTenderCategory;
