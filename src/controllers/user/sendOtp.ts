import { Request, Response } from "express";
import prisma from "../../prisma/";
import { Random, MersenneTwister19937 } from "random-js";
import ApiResponse from "../../types/response";
import mailto from "../../configs/sendEmailConfig";

export default async (req: Request, res: Response) => {
    let userOpt: any;
    let optCode: number;

    try {
        const random = new Random(MersenneTwister19937.autoSeed());
        optCode = random.integer(100000, 999999);
        console.log('random: ', optCode);
    } catch(error) {
        console.error(error);
        return res.status(500).json(new ApiResponse(false, "error while processing request"));
    }

    try {
        userOpt = await prisma.client.user_opts.create({
            data: {
                email: req.body.email,
                opt_code: optCode.toString(),
            }
        });

        console.log('user opt:', userOpt);
    } catch(error) {
        console.error(error);
        return res.status(500).json(new ApiResponse(false, "error while processing request"));
    }

    try {
        const subject = "opt code for email verification";
        const html = `<h1>${optCode}</h1>`;
        await mailto(req.body.email, subject, html);
    } catch(error) {
        console.error(error);
        return res.status(500).json(new ApiResponse(false, "error while processing request"));
    }

    return res.status(200).json(new ApiResponse(true, "opt code has been sent to email successfully"));
}

