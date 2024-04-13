import prisma from "../../../prisma/index";
import { Prisma } from "@prisma/client"
import { Request, Response } from "express";
import Validator from "../../../validation/index";
import ApiResponse from "../../../types/response";

export default async (req: Request, res: Response) => {
    const { error } = Validator.job.jobCatagory.validate(req.body);
    if (error) {

        res.send(new ApiResponse(false, "unidentified request content", error.details));

        return;

    }

    let newCatagory: Object;

    try {
        newCatagory = await prisma.client.job_category.create({
            data: {
                name: req.body.name
            }
        });

    } catch(error: any) {

        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
            return res.status(400).json(new ApiResponse(false, 'Duplicate catagory name', error));
        }

        console.error("Error inserting user:", error);

        return res.status(500).send(new ApiResponse(false, 'Unknown error at registering user', error)); 

    }

    res.send(new ApiResponse(true, "New job catagory is added", newCatagory));

}
