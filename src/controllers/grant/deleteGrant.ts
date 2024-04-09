import prisma from "../../prisma/index";
import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import Validator from "../../validation/index";
import ApiResponse from "../../types/response";

export default async (req: Request, res: Response) => {

    const { error } = Validator.grant.deleteGrant.validate(req.body);

    if (error) {
        return res.status(400).json(new ApiResponse(false, "unidentified request content", error.details));
    }

    try {
        const newGrant = await prisma.client.grant.delete({
            where: {
                id: req.body.id
            }
        });

        res.status(201).json({
            success: true,
            message: "Grant deleted successfully",
            data: newGrant
        });

    } catch (error) {

        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            return res.status(400).json({
                success: false,
                message: 'error while deleting grant',
                data: error,
            });
        }

        return res.status(500).json({
            success: false,
            message: "Error while posting grant",
            data: error,
        });
    }
}
