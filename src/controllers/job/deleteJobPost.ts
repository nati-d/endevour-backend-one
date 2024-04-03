import prisma from "../../prisma/index";
import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import Validator from "../../validation/index";

export default async (req: Request, res: Response) => {

    try {

        const { error } = Validator.job.deleteJobPost.validate(req.body);

        if (error) {
            return res.send({
                success: false,
                message: error.details,
                data: null
            })
        }

    } catch(error) {

        console.log(error); 

        return res.status(400).send({
            status: false,
            message: "Error at request validation",
            description: error
        });
  
    }

    try {

        const deletedJobPost = await prisma.client.job_post.delete({
            where: {
                id: req.body.id
            }
        });

        res.status(200).json({
            success: true,
            message: "Job post deleted successfully",
            data: deletedJobPost
        });

    } catch (error) {

        if (error instanceof Prisma.PrismaClientKnownRequestError) {

            if (error.code = "P2015") {
                return res.status(400).json({
                    status: false,
                    message: 'Record to delete does not exist',
                    error: error,
                });
            }

        }

        console.error("Error while deleting job post:", error);

        res.status(500).json({
            success: false,
            message: "Unknown error at deleting job post",
            error: error
        });

    }
};

