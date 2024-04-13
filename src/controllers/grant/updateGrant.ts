import prisma from "../../prisma/index";
import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import Validator from "../../validation/index";
import ApiResponse from "../../types/response";

export default async (req: Request, res: Response) => {

    try {
        const { error } = Validator.grant.updateGrant.validate(req.body);
        if (error) {
            return res.status(400).json(new ApiResponse(false, "unidentified reqeuest content", error.details));
        }
    } catch (error) {
        return res.status(400).json(new ApiResponse(false, "error at validating request"));
    }

    try {
        const grant = await prisma.client.grant.update({
            where: {
                id: req.body.id
            },
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
                    })),
                    disconnect: req.body.tags_to_remove.map((name: string) => ({ name })),
                }
            },
            include: { tags: { select: { name: true } } }
        });

        res.status(200).json(new ApiResponse(true, "grant updated successfully", grant));

    } catch (error) {
        console.log(error)

        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if ( error.code === "P2022" )
                return res.status(403).json(new ApiResponse(false, "not authorized to post blogs", error));

            if ( error.code === "P2016" )
                return res.status(404).json(new ApiResponse(false, "resource to be updated not found", error));
        }

        return res.status(500).json(new ApiResponse(false, "Error while posting "));
    }
};
