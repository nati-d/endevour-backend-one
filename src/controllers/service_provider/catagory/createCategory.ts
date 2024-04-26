import prisma from "../../../prisma/index";
import { Prisma } from "@prisma/client"
import { Request, Response } from "express";
import Validator from "../../../validation/index";
import ApiResponse from "../../../types/response";

export default async (req: Request, res: Response) => {
    let newCategory: Object;

    try {
        newCategory = await prisma.client.service_provider_category.create({
            data: {
                name: req.body.name,
                verified_by: req.auth.id
            }
        });

    } catch(error: any) {

        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
            return res.status(400).json(new ApiResponse(false, 'Duplicate catagory name', error));
        }

        console.error("Error inserting user:", error);

        return res.status(500).send(new ApiResponse(false, 'Unknown error at creating service provider category user', error)); 

    }

    res.send(new ApiResponse(true, "New service provider category is added", newCategory));

}
