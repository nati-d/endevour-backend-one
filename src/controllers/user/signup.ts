import { Request, Response } from "express";
import { PrismaClient, Prisma } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Validator from "../../validators/index";

const prisma = new PrismaClient();

export default async (req: Request, res: Response) => {
    try {
        let { error } = Validator.signup.validate(req.body);
        if (error) {
            return res.status(400).send({
                status: false,
                message: "Invalid value set",
                description: error.details
            });
        }
    } catch (error) {
        return res.status(400).send({
            status: false,
            message: "Error at request validation",
            description: error
        });
    }

    try {
        req.body.password = await bcrypt.hash(req.body.password, 10);
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            status: false,
            message: "Internal server error",
            description: error
        });
    }

    let newUser;
    try {
        const { first_name, last_name, email, phone_number, location, password } = req.body;
        newUser = await prisma.user.create({
            data: {
                first_name,
                last_name,
                email,
                phone_number,
                location: {
                    create: {
                        x: location.x,
                        y: location.y
                    }
                },
                password
            }
        });
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
            return res.status(400).json({
                status: false,
                message: 'Duplicate entry for email or phone number',
                error: error,
            });
        }
        console.error("Error inserting user:", error);
        return res.status(500).send({
            status: false,
            message: 'Unknown error at registering user',
            error: error,
        });
    } finally {
        await prisma.$disconnect();
    }

    try {

        const token = jwt.sign( newUser, process.env.JWT_KEY as string);

        return res.status(201).json({
            status: true,
            message: 'User registered successfully',
            token: token
        });

    } catch (error) {

        console.error("Error signing JWT token:", error);

        return res.status(500).send({
            status: false,
            message: 'Error signing JWT token',
            error: error,
        });

    }
}
