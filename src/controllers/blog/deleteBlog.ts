import prisma from "../../prisma/index";
import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import ApiResponse from "../../types/response";

export default async (req: Request, res: Response) => {

    try {
        let blog: any;
        if (req.auth?.role == 'SUPER_ADMIN' || req.auth?.role == 'ADMIN')
        blog = await prisma.client.blog.delete({
            where: { id: parseInt( req.query.id as string ) },
        });

        else if (!req.auth.is_admin) {
            const blogToBeDeleted = await prisma.client.blog.findFirst({ where: { id: parseInt( req.query.id as string ) } } ) 

            if (!blogToBeDeleted)
            return res.status(404).json(new ApiResponse(false, "resource to be deleted no found"));

            if (blogToBeDeleted?.posted_by != req.auth.id)
            return res.status(403).json(new ApiResponse(false, "not authorized to delete the resource"))

            blog = await prisma.client.blog.delete({
                where: { id: parseInt( req.query.id as string ) },
            });
        }

        if (!blog)
        return res.status(404).json(new ApiResponse(false, "resource to be deleted no found"));

        return res.status(204).json(new ApiResponse(true, "blog deleted successfully", blog));

    } catch (error) {
        console.log(error);

        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if ( error.code === "P2025" )
            return res.status(404).json(new ApiResponse(false, "resource to be deleted not found", error));
        }

        return res.status(400).json(new ApiResponse(false, "error while deleting blog", error));
    }

}
