"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = __importDefault(require("../../prisma/client/prismaClient"));
const response_1 = __importDefault(require("../../types/response"));
const verifyServiceProvider = async (req, res, next) => {
    try {
        // SP-> service_provider
        const { SP_id } = req.params;
        const admin_id = req.auth.id;
        const selectSP = await prismaClient_1.default.service_provider.findFirst({
            where: {
                id: parseInt(SP_id),
                verified_by: null,
            },
        });
        if (!selectSP)
            return res
                .status(400)
                .json(new response_1.default(false, "Invalid data. Can't find service provider post with the provided data!"));
        const verifiedSP = await prismaClient_1.default.service_provider.update({
            where: {
                id: parseInt(SP_id),
            },
            data: {
                verified_by: admin_id,
            },
            select: {
                email: true,
            },
        });
        if (!verifiedSP.email)
            return;
        req.emailData = {
            sendTo: verifiedSP.email,
            subject: "service provider post verification",
            html: "<p> Congratulations your service provider post is verified.",
            otherData: verifiedSP,
            resMessage: "service provider verified successfully.",
            statusCode: 201,
            queryOnFail: async () => await prismaClient_1.default.service_provider.update({
                where: {
                    id: parseInt(SP_id),
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
            .json(new response_1.default(false, "Failed to verify service provider post", null, error));
    }
};
exports.default = verifyServiceProvider;
