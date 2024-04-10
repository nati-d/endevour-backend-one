import prisma from "../../prisma/index";
import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import Validator from "../../validation/index";

export default async (req: Request, res: Response) => {

    try {

        const { error } = Validator.job.deleteJobPost.validate(req.body);

        if (error) {
            return res.status(400).send({
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

    let deletedJobPost;

    try {

        if (req?.auth?.role == "ADMIN" || req?.auth?.role == "SUPER_ADMIN")
            deletedJobPost = await prisma.client.job_post.delete({
                where: {
                    id: req.body.id
                }
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

        return res.status(500).json({
            success: false,
            message: "Unknown error at deleting job post",
            error: error
        });

    }

    return res.status(200).json({
        success: true,
        message: "job post deleted successfully",
        data: deletedJobPost
    });

};
