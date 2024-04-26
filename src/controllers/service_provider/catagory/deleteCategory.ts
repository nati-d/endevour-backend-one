import prisma from "../../../prisma/index";
import { Request, Response } from "express";
import ApiResponse from "../../../types/response";

export default async (req: Request, res: Response) => {

    try {
        const category = await prisma.client.service_provider_category.delete({
            where: { name: req.query.name as string }
        });

        res.status(204).send(new ApiResponse(true, "data deleted successfully", category));

    } catch(error: any) {
        console.log(error);

        return res.status(500).send(new ApiResponse(false, 'Unknown error while deleted data', error)); 

    }

}
