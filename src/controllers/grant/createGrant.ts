import prisma from "../../prisma/index";
import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import Validator from "../../validation/index";
import ApiResponse from "../../types/response";

export default async (req: Request, res: Response) => {
    try {
        const { error } = Validator.grant.createGrant.validate(req.body);

        if (error) {
            return res.status(400).json(new ApiResponse(false, error.message));
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
                    connectOrCreate: req.body.tags.map((name: string) => ({
                        where: { name },
                        create: { name }
                    }))
                }
            },
            include: {
                tags: { select: { name: true } }
            }
        });

        res.status(201).json(new ApiResponse(true, "Grant created successfully", newGrant));

    } catch (error) {
        console.error("Error while posting news:", error);

        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if ( error.code === "P2022" )
                return res.status(403).json(new ApiResponse(false, "not authorized to post blogs", error));
        }

        return res.status(500).json(new ApiResponse(false, "Error while posting grant"));
    }
};
