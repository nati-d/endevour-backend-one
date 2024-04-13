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
        await prisma.client.grant.delete({
            where: {
                id: parseInt( req.query.id as string )
            }
        });

        return res.status(204).json(new ApiResponse(true, "grant deleted successfully"));

    } catch (error) {
        console.log(error);

        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if ( error.code === "P2022" )
            return res.status(403).json(new ApiResponse(false, "not authorized to post blogs", error));

            if ( error.code === "P2025" )
            return res.status(404).json(new ApiResponse(false, "resource to be deleted not found", error));
        }

       return res.status(500).json(new ApiResponse(false, "Error while posting grant"));
    }
}
