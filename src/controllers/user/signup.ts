import { Request, Response } from "express";
import prisma from "../../prisma/client/prismaClient";
import { Prisma } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Validator from "../../validation/index";
import ApiResponse from "../../types/response";

export default async (req: Request, res: Response) => {

    let { error } = Validator.user.userSignupSchema.validate(req.body);

    if (error) return res.status(400).send(new ApiResponse(false, "Invalid value set", error.details));

    let user: any;

    try {
        const otpCode = await prisma.user_opts.findFirst({
            where: { opt_code: req.body.opt_code }
        });

        if (!otpCode)
        return res.status(404).json(new ApiResponse(false, "invalid or expired otp code"));

        const now = new Date();
        const date = new Date(otpCode.created_at);
        const diff = now.getTime() - date.getTime();

        if (diff > 300000)
        return res.status(401).json(new ApiResponse(false, "invalid or expired opt code"));
    } catch(error) {
        console.error(error);
        return res.status(401).json(new ApiResponse(false, "invalid or expired otp code"));
    }

    try {
        req.body.password = await bcrypt.hash(req.body.password, 10);

        const { first_name, last_name, email, phone_number, location } = req.body;

        user = await prisma.user.create({
            data: {
                first_name,
                last_name,
                email,
                phone_number,
                location: {
                    x: location.x,
                    y: location.y,
                },
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

        const token = jwt.sign(user, 'jwtprivatekey');

        return res.header('authorization', token).status(201).json(new ApiResponse(true, "User registered successfully", token));
    } catch (error) {
        console.error("Error signing JWT token:", error);

        return res.status(500).send({
            status: false,
            message: "Error signing JWT token",
            error: error,
        });
    }
}

