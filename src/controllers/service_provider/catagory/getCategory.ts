import prisma from "../../../prisma/index";
import { Request, Response } from "express";
import ApiResponse from "../../../types/response";

export default async (req: Request, res: Response) => {

    try {
        const catatories = await prisma.client.service_provider_category.findMany({
            where: {
                name: req.params.name,
                verified_by: parseInt(req.params.verified_by as string) || undefined
            }
        });

        res.send(new ApiResponse(true, "data fetched successfully", catatories));

    } catch(error: any) {

        return res.status(500).send(new ApiResponse(false, 'Unknown error while fetching data', error)); 

    }

}
