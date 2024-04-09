import prisma from "../../prisma/index";
import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import Validator from "../../validation/index";
import ApiResponse from "../../types/response";

export default async (req: Request, res: Response) => {
    try {
        const { error } = Validator.grant.createGrant.validate(req.body);

        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details,
                data: null,
            });
        }
    } catch (error) {
        return res.status(400).json(new ApiResponse(false, 'error at validating request'));
    }

    try {
        const newGrant = await prisma.client.grant.create({
            data: {
                title: req.body.title,
                overview: req.body.overview,
                body: req.body.body,
                verified_by: req.auth?.id as number,
                location: req.body.location,
                opportunity_number: req.body.opportunity_number,
                cfda: req.body.cfda,
                tags: {
                    connectOrCreate: req.body.tags.map((id: string) => ({
                        where: { id },
                        create: { id }
                    }))
                }
            }
        });

        res.status(201).json({
            success: true,
            message: "Grant created successfully",
            data: newGrant
        });

    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2022") {
            return res.status(400).json({
                success: false,
                message: 'Not authorized to post grant',
                data: error,
            });
        }

        console.error("Error while posting news:", error);
        return res.status(500).json({
            success: false,
            message: "Error while posting grant",
            data: error,
        });
    }
};
