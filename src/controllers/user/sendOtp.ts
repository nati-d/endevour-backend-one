import { Request, Response } from "express";
import prisma from "../../prisma/";
import { Random, MersenneTwister19937 } from "random-js";
import ApiResponse from "../../types/response";
import mailto from "../../configs/sendEmailConfig";

export default async (req: Request, res: Response) => {
    let userotp: any;
    let otpCode: number;

    try {
        const random = new Random(MersenneTwister19937.autoSeed());
        otpCode = random.integer(100000, 999999);
        console.log('random: ', otpCode);
    } catch(error) {
        console.error(error);
        return res.status(500).json(new ApiResponse(false, "error while processing request"));
    }

    try {
        userotp = await prisma.client.user_otps.create({
            data: {
                email: req.body.email,
                otp_code: otpCode.toString(),
            }
        });

        console.log('user otp:', userotp);
    } catch(error) {
        console.error(error);
        return res.status(500).json(new ApiResponse(false, "error while processing request"));
    }

    try {
        const subject = "otp code for email verification";
        const html = `<h1>${otpCode}</h1>`;
        await mailto(req.body.email, subject, html);
    } catch(error) {
        console.error(error);
        return res.status(500).json(new ApiResponse(false, "error while processing request"));
    }

    return res.status(200).json(new ApiResponse(true, "otp code has been sent to email successfully"));
}

