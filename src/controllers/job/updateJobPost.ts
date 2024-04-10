import prisma from "../../prisma/index";
import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import _ from "lodash";
import Validator from "../../validation/index";

export default async (req: Request, res: Response) => {

    const { error } = Validator.job.updateJobPost.validate(req.body);
    if (error) {
        return res.status(400).json({
            success: false,
            message: "Invalid request data",
            error: error.details
        });
    }

    let updatedJobPost;
    let updatedJobPostSalary;

    try {

        if (req?.auth?.role == "ADMIN" || req?.auth?.role == "SUPER_ADMIN") {
            updatedJobPost = await prisma.client.job_post.update({
                where: { id: req.body.id },
                data: {
                    title: req.body.title,
                    overview: req.body.overview,
                    body: req.body.body,
                    contract_type: req.body.contract_type,
                    year_of_experience: req.body.year_of_experience,
                    thumbnail: req.body.thumbnail,
                    category: req.body.category,
                    closing_date: new Date(req.body.closing_date),
                }
            });

            updatedJobPostSalary = await prisma.client.salary.update({
                where: { id: req.body.id },
                data: {
                    low_end: req.body.low_end,
                    high_end: req.body.high_end,
                    periodicity: req.body.periodicity,
                    currency: req.body.currency,

                }
            })
        }

    } catch (error) {

        if (error instanceof Prisma.PrismaClientKnownRequestError) {

                return res.status(400).json({
                    status: false,
                    message: 'unknown database error',
                    error: error,
                });

        }

        console.error("Error while updating job post:", error);

        res.status(500).json({
            success: false,
            message: "Unknown error at updating job post",
            error: error
        });

    }

    res.status(201).json({
        success: true,
        message: "Job post updated successfully",
        data: _.merge(updatedJobPost, updatedJobPostSalary)
    });
};

