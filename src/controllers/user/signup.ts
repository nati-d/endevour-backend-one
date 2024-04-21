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

    let newUser;

    try {
        req.body.password = await bcrypt.hash(req.body.password, 10);

        const { first_name, last_name, email, phone_number, location, password } = req.body;

        newUser = await prisma.user.create({
            data: {
                first_name,
                last_name,
                email,
                phone_number,
                location: {
                    x: location.x,
                    y: location.y,
                },
                password,
            },
        });

    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if ( error.code === "P2002" ) {
                return res.status(400).json(new ApiResponse(false, "Duplicate entry for email or phone number", error))
            }
        }

        return res.status(500).json(new ApiResponse(false, "Unknown error at registering user", error))
    }

    try {
        newUser.password;

        const token = jwt.sign(newUser, 'jwtsecretkey');

        return res.header('authorization', token).status(201).json(new ApiResponse(true, "User registered successfully", newUser));
    } catch (error) {
        console.error("Error signing JWT token:", error);

        return res.status(500).send({
            status: false,
            message: "Error signing JWT token",
            error: error,
        });
    }
}

