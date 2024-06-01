import { Request, Response } from "express";
import prisma from "../../prisma/client/prismaClient";
import jwt from "jsonwebtoken";
import { Prisma } from "@prisma/client";
import Validator from "../../validation/index";
import ApiResponse from "../../types/response";

export default async (req: Request, res: Response) => {

    let { error } = Validator.user.update.validate(req.body);

    if (error) return res.status(400).send(new ApiResponse(false, "Invalid value set", error.details));

    let user: any;

    try {
        user = await prisma.user.update({
            where: { id: req.auth.id },
            data: {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                phone_number: req.body.phone_number,
                location: req.body.location,
            },
            select: {
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
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2001") {
                return res.status(404).json(new ApiResponse(false, "User not found", error));
            }
        }

        return res.status(500).json(new ApiResponse(false, "Unknown error while updating user", error));
    }

    const token = jwt.sign(user, process.env.JWT_KEY || "");
    return res.header('authorization', token).status(200).json(new ApiResponse(true, "User updated successfully", user));
}
