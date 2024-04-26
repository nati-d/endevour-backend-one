import prisma from "../../../prisma/index";
import { Request, Response } from "express";
import ApiResponse from "../../../types/response";

export default async (req: Request, res: Response) => {

    try {
        const newCatagory = await prisma.client.service_provider_category.update({
            where: { name: req.body.name },
            data: { name: req.body.new_name }
        });

        res.status(200).send(new ApiResponse(true, "data updated successfully", newCatagory));

    } catch(error: any) {
        console.log(error);

        return res.status(500).send(new ApiResponse(false, 'Unknown error while updating data', error)); 

    }

}
