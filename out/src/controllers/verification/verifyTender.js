"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = __importDefault(require("../../prisma/client/prismaClient"));
const response_1 = __importDefault(require("../../types/response"));
const verifyTender = async (req, res, next) => {
    try {
        const { tender_id } = req.params;
        const admin_id = req.auth.id;
        const selectTender = await prismaClient_1.default.tender.findFirst({
            where: {
                id: parseInt(tender_id),
                posted_by: { not: null },
                verified_by: null,
            },
        });
        if (!selectTender)
            return res
                .status(400)
                .json(new response_1.default(false, "Invalid data. Can't find tender with the provided data!"));
        const verifiedTender = await prismaClient_1.default.tender.update({
            where: {
                id: parseInt(tender_id),
            },
            data: {
                verified_by: admin_id,
            },
            include: {
                user: {
                    select: {
                        email: true,
                    },
                },
            },
        });
        if (!verifiedTender.user?.email)
            return;
        req.emailData = {
            sendTo: verifiedTender.user?.email,
            subject: "Tender post verification",
            html: "<p> Congratulations your tender is verified.",
            otherData: verifiedTender,
            resMessage: "Tender verified successfully.",
            statusCode: 201,
            queryOnFail: async () => await prismaClient_1.default.tender.update({
                where: {
                    id: parseInt(tender_id),
                },
                data: {
                    verified_by: null,
                },
            }),
        };
        next();
    }
    catch (error) {
        return res
            .status(500)
            .json(new response_1.default(false, "Failed to verify tender", null, error));
    }
};
exports.default = verifyTender;
