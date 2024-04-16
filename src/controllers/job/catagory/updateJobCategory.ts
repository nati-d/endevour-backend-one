import prisma from "../../../prisma/index";
import { Request, Response } from "express";
import ApiResponse from "../../../types/response";

export default async (req: Request, res: Response) => {

    try {
        const newCatagory = await prisma.client.job_category.update({
            where: { id: req.body.id },
            data: { name: req.body.name }
        });

        res.status(200).send(new ApiResponse(true, "data updated successfully", newCatagory));

    } catch(error: any) {
        console.log(error);

        return res.status(500).send(new ApiResponse(false, 'Unknown error while updating data', error)); 

    }

}
