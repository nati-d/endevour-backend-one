import prisma from "../../prisma/index";
import { Prisma } from "@prisma/client"
import { Request, Response } from "express";
import Validator from "../../validation/index";

export default async (req: Request, res: Response) => {
    
    try {

        const { error } = Validator.job.jobCatagory.validate(req.body);
        if (error) {

            res.send({
                success: false,
                message: error.details,
                data: null
            });

            return;

        }

    } catch(error) {

        console.error(error);

        return res.status(400).send({
            status: false,
            message: "Error at request validation",
            description: error
        });

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
            return res.status(400).json({
                status: false,
                message: 'Duplicate catagory name',
                error: error,
            });
        }

        console.error("Error inserting user:", error);

        return res.status(500).send({
            success: false,
            message: 'Unknown error at registering user',
            error: error,
        }); 

    }

    res.send({
        success: true,
        message: "New job catagory is added",
        data: newCatagory,
    })

}
