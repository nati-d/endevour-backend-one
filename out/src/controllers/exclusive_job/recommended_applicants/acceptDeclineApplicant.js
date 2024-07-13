"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = __importDefault(require("../../../prisma/client/prismaClient"));
const response_1 = __importDefault(require("../../../types/response"));
const acceptDeclineApplicant = async (req, res) => {
    const { job_id, applicant_id } = req.body;
    try {
        const getApplicant = await prismaClient_1.default.recommended_applicant.findFirst({
            where: {
                id: applicant_id,
                job: job_id,
            },
        });
        if (!getApplicant)
            return res
                .status(400)
                .json(new response_1.default(false, "Ivalid information about the applicant!"));
        const updatedApplicant = await prismaClient_1.default.recommended_applicant.update({
            where: {
                id: getApplicant.id,
            },
            data: {
                accepted: true,
                verified_by: req.auth?.id,
            },
        });
        return res
            .status(200)
            .json(new response_1.default(true, "Verified successfully.", updatedApplicant));
        // req.emailData = {
        //   sendTo: getApplicant.email,
        //   subject: "Application Accesptance Confirmation",
        //   html: "<b> You are accepted successfully</b>",
        //   otherData: updatedApplicant,
        //   queryOnFail: async () =>
        //     await prisma.recommended_applicant.update({
        //       where: {
        //         id: getApplicant.id,
        //       },
        //       data: {
        //         accepted: null,
        //         verified_by: null,
        //       },
        //     }),
        // };
        // next();
    }
    catch (error) {
        console.log(error);
        return res
            .status(500)
            .json(new response_1.default(false, "Failed to update applicant please try again!", null, error));
    }
};
exports.default = acceptDeclineApplicant;
