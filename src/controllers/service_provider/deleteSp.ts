import prisma from "../../prisma/index";
import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import ApiResponse from "../../types/response";

export default async (req: Request, res: Response) => {
    try {
        let deletedSp;

        if (req.auth?.role == 'SUPER_ADMIN' || req.auth?.role == 'ADMIN') {
            deletedSp = await prisma.client.service_provider.delete({
                where: { id: parseInt( req.query.id as string ) }
            });

        }
        else if (!req.auth.is_admin) {
            const spToBeDeleted = await prisma.client.service_provider.findFirst({ where: { id: parseInt( req.query.id as string ) } } ) 

            if (spToBeDeleted?.id == req.auth.id)

            deletedSp = await prisma.client.service_provider.delete({
                where: { id: parseInt( req.query.id as string ) }
            });
        }

        return res.status(204).json(new ApiResponse(true, "service provider deleted successfully", deletedSp));
    } catch (error) {

        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2025")
            return res.status(404).json(new ApiResponse(false, "resource to be deleted not found", error));

            if (error.code === "P2015") {
                return res.status(400).json(new ApiResponse(false, 'Record to delete does not exist', error));
            }
        }

        console.error("Error while deleting job post:", error);

        return res.status(500).json(new ApiResponse(false, "Unknown error at deleting job post", error));

    }
};
