import prisma from "../../../prisma/index";
import { Request, Response } from "express";
import ApiResponse from "../../../types/response";

export default async (req: Request, res: Response) => {

    try {
        const newCatagory = await prisma.client.job_category.delete({
            where: { id: parseInt( req.query.id as string ) }
        });

        res.status(204).send(new ApiResponse(true, "data updated successfully", newCatagory));

    } catch(error: any) {
        console.log(error);

        return res.status(500).send(new ApiResponse(false, 'Unknown error while updating data', error)); 

    }

}
