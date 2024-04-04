import prisma from "../../../prisma/index";
import { Request, Response } from "express";

export default async (req: Request, res: Response) => {

    try {
        const newCatagory = await prisma.client.job_category.findMany();

        res.send({
            success: true,
            message: "New job catagory is added",
            data: newCatagory,
        });

    } catch(error: any) {

        return res.status(500).send({
            success: false,
            message: 'Unknown error while fetching data',
            error: error,
        }); 

    }

}
