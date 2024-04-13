import prisma from "../../../prisma/index";
import { Request, Response } from "express";
import ApiResponse from "../../../types/response";

export default async (req: Request, res: Response) => {

    try {
        const newCatagory = await prisma.client.job_category.findMany();

        res.send(new ApiResponse(true, "data fetched successfully", newCatagory));

    } catch(error: any) {

        return res.status(500).send(new ApiResponse(false, 'Unknown error while fetching data', error)); 

    }

}
