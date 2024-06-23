import { Request, Response } from "express";
import prisma from "../../prisma/client/prismaClient";
import { Prisma } from "@prisma/client";
import { Random, MersenneTwister19937 } from "random-js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Validator from "../../validation/index";
import mailto from "../../configs/sendEmailConfig";
import ApiResponse from "../../types/response";

export default async (req: Request, res: Response) => {

    let { error } = Validator.user.userSignupSchema.validate(req.body);

    if (error) return res.status(400).send(new ApiResponse(false, "Invalid value set", error.details));

    let user: any;
    let userotp: any;
    let otpCode: number;

    try {
        req.body.password = await bcrypt.hash(req.body.password, 10);

        const { first_name, last_name, email, phone_number, location } = req.body;

        user = await prisma.user.create({
            data: {
                first_name,
                last_name,
                email,
                phone_number,
                location,
                password: req.body.password,
            },
            select: {
                password: false,
                id: true,
                username: true,
                first_name: true,
                last_name: true,
                email: true,
                phone_number: true,
                profile_image: true,
                location: true,
                verified_by: true,
                created_at: true,
                updated_at: true
            }
        });

        user.is_admin = false;
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if ( error.code === "P2002" ) {
                return res.status(400).json(new ApiResponse(false, "Duplicate entry for email or phone number", error))
            }
        }

        return res.status(500).json(new ApiResponse(false, "Unknown error at registering user", error))
    }

    try {
        const random = new Random(MersenneTwister19937.autoSeed());
        otpCode = random.integer(100000, 999999);
        console.log('random: ', otpCode);
    } catch(error) {
        console.error(error);
        return res.status(500).json(new ApiResponse(false, "error while processing request"));
    }

    try {
        userotp = await prisma.user_otps.upsert({
            where: {
                email: req.body.email
            },
            update: {
                otp_code: otpCode.toString()
            },
            create: {
                email: req.body.email,
                otp_code: otpCode.toString()
            }
        });

        console.log('user otp:', userotp);
    } catch(error) {
        console.error(error);
        return res.status(500).json(new ApiResponse(false, "error while processing request"));
    }

    try {
        const subject = "otp code for email verification";
        const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your OTP Code</title>
    <style>
        /* Email clients have limited CSS support, so keep it simple */
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f9f9f9;
        }
        .container {
            width: 100%;
            padding: 20px;
            background-color: #ffffff;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            max-width: 600px;
            margin: 40px auto;
            border-radius: 8px;
            text-align: center;
        }
        .header {
            background-color: #007BFF;
            color: white;
            padding: 10px 0;
            border-radius: 8px 8px 0 0;
        }
        .content {
            padding: 20px;
        }
        .content p {
            font-size: 1.2em;
            margin: 10px 0;
        }
        .otp-code {
            font-size: 2em;
            color: #4CAF50;
            margin: 20px 0;
        }
        .footer {
            margin-top: 30px;
            font-size: 0.9em;
            color: #666666;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Your OTP Code</h1>
        </div>
        <div class="content">
            <p>Dear User,</p>
            <p>To complete your verification, please use the following One-Time Password (OTP):</p>
            <p class="otp-code" id="otp-code">${otpCode}</p>
            <p>This OTP is valid for the next 10 minutes. Do not share this code with anyone.</p>
        </div>
        <div class="footer">
            <p>Thank you for using our service.</p>
            <p>&copy; 2024 Your Company. All rights reserved.</p>
        </div>
    </div>

    <script>
        var otpCode = '${otpCode}';
        document.getElementById('otp-code').textContent = otpCode;
    </script>
</body>
</html>
`;
        await mailto(req.body.email, subject, html);

        return res.status(201).json(new ApiResponse(true, "successfully registered"));
    } catch(error) {
        console.error(error);
        return res.status(500).json(new ApiResponse(false, "error while processing request"));
    }
}

