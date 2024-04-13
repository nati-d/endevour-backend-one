import prisma from "../../prisma/index";
import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import Validator from "../../validation/index";
import ApiResponse from "../../types/response";

export default async (req: Request, res: Response) => {

    try {
        let blog: any;
        if (req.auth?.role == "ADMIN" || req.auth?.role == "SUPER_ADMIN")
        blog = await prisma.client.blog.delete({
            where: { id: parseInt( req.query.id as string ) },
        });

        else
        blog = await prisma.client.blog.delete({
             where: { id: req.body.id },
        });

        res.status(204).json(new ApiResponse(true, "blog deleted successfully", blog));

    } catch (error) {
        console.log(error);

        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if ( error.code === "P2022" )
                return res.status(403).json(new ApiResponse(false, "not authorized to post blogs", error));

            if ( error.code === "P2025" )
                return res.status(404).json(new ApiResponse(false, "resource to be deleted not found", error));
        }

        res.status(400).json(new ApiResponse(false, "error while creating blog", error));
    }

}
