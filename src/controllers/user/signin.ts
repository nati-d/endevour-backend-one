import { Request, Response } from "express";
import prisma from "../../prisma/";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import ApiResponse from "../../types/response";

export default async (req: Request, res: Response) => {
    let user: any = req.user;
    try {
        if (user) {
            user = await prisma.client.user.findFirst({
                where: {
                    user_credential: { credential_id: user.id, provider: user.provider },
                },
                include: {
                    exclusive_jobs: true,
                },
            });
        } else if (req.body) {
            user = await prisma.client.user.findFirst({
                where: { email: req.body.email },
                include: {
                    exclusive_jobs: true,
                },
            });

            if (!user)
            return res.status(400).json(new ApiResponse(false, "user not found"));

            let verification = await prisma.client.user_otps.findFirst({
                where: { email: req.body.email, valid: true }
            });

            if (!verification)
            return res.status(401).json(new ApiResponse(false, "email is not verified"));

            const comparePassword = await bcrypt.compare(
                req.body.password,
                user.password
            );

            if (!comparePassword)
            return res
                .status(401)
                .json(new ApiResponse(false, "Incorrect email or password"));
        } else {
            return res
                .status(400)
                .json(new ApiResponse(false, "unable to authenticate user"));
        }
    } catch (error) {
        console.error(error);

        return res
            .status(500)
            .json(new ApiResponse(false, "error while validating request"));
    }

    try {
        user.is_admin = false;
        delete user.password;
        const token = jwt.sign(user, process.env.JWT_KEY || "");
        return res
            .header("authorization", token)
            .json(new ApiResponse(true, "successful log in", token));
    } catch (error) {
        console.error(error);

        return res.status(400).json(new ApiResponse(false, "invalid token"));
    }
};
