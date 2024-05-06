import { Request, Response } from 'express';
import prisma from '../../../../prisma/'
import { Prisma } from "@prisma/client";
import ApiResponse from '../../../../types/response';

export default async (req: Request, res: Response) => {

    let toBeDeleted: any;
    let where = {
        user: req.auth.id,
        job: parseInt( req.query.id as string )
    }
    try {
        toBeDeleted = await prisma.client.saved_job.findFirst({ where });

        if (!toBeDeleted)
        return res.status(404).json(new ApiResponse(false, "resource to be deleted not found"));

        if (toBeDeleted.user != req.auth.id)
        return res.status(403).json(new ApiResponse(false, "does not have access to give the code"));
    } catch(error) {
        console.error(error);
        return res.status(500).json(new ApiResponse(false, "error while processing request"))
    }

    try {
        await prisma.client.saved_job.deleteMany({ where });
        return res.status(204).json(new ApiResponse(true, "content deleted successfully"));
    } catch(error) {
        console.error(error);
        return res.status(500).json(new ApiResponse(false, "error while processing request"));
    }
}
