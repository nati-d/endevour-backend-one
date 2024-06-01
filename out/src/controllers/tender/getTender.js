"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = __importDefault(require("../../prisma/client/prismaClient"));
const response_1 = __importDefault(require("../../types/response"));
const getTender = async (req, res) => {
    const { tender_id } = req.params;
    try {
        const tender = await prismaClient_1.default.tender.findUnique({
            where: {
                id: parseInt(tender_id),
            },
            include: {
                files: true,
                tender_category: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });
        if (!tender)
            return res
                .status(404)
                .json(new response_1.default(false, "We can't find tender with the given id."));
        return res
            .status(200)
            .json(new response_1.default(true, "Tender getted successfully.", tender));
    }
    catch (error) {
        console.log(error);
        return res
            .status(500)
            .json(new response_1.default(false, "Something went wrong while getting tender.", null, error));
    }
};
exports.default = getTender;
