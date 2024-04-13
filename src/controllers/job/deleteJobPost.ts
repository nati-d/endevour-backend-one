import prisma from "../../prisma/index";
import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import Validator from "../../validation/index";
import ApiResponse from "../../types/response";

export default async (req: Request, res: Response) => {
    let deletedJobPost;

    try {

        if (req?.auth?.role == "ADMIN" || req?.auth?.role == "SUPER_ADMIN")
        deletedJobPost = await prisma.client.job_post.delete({
            where: { id: parseInt( req.query.id as string ) }
        });

        return res.status(204).json(new ApiResponse(true, "job post deleted successfully", deletedJobPost));

    } catch (error) {

        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if ( error.code === "P2025" )
            return res.status(404).json(new ApiResponse(false, "resource to be deleted not found", error));

            if (error.code = "P2015") {
                return res.status(400).json(new ApiResponse(false, 'Record to delete does not exist', error));
            }

        }

        console.error("Error while deleting job post:", error);

        return res.status(500).json(new ApiResponse(false, "Unknown error at deleting job post", error));

    }
};
