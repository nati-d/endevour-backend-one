import prisma from "../../prisma/index";
import { Prisma } from "@prisma/client"
import { Request, Response } from "express";
import _ from "lodash";
import Validator from "../../validation/index";

export default async (req: Request, res: Response) => {

    try {

        const { error } = Validator.job.getJobPost.validate(req.body);

        if (error) {

            return res.send({
                success: false,
                message: error.details,
                data: null
            });

        }

    } catch(error) {

        console.error(error);

        return res.status(400).send({
            status: false,
            message: "Error at request validation",
            description: error
        });

    }

    try {
        const jobPosts = await prisma.client.job_post.findMany({
            where: {
                contract_type: {
                    in: req.body.contract_type
                },
                year_of_experience: {
                    gte: req.body.year_of_experience.lower_bound,
                    lte: req.body.year_of_experience.upper_bound
                },
                category: {
                    in: req.body.category
                },
                closing_date: {
                    gte: req.body.closing_date.lower_bound,
                    lte: req.body.closing_date.upper_bound
                },
                salary: {
                    low_end: {
                        lte: req.body.salary.high_end,
                    },
                    high_end: {
                        gte: req.body.salary.low_end,
                    },
                    periodicity: {
                        in: req.body.salary.periodicity
                    },
                    currency: {
                        in: req.body.salary.currency,
                    }
                }
            },
            include: {
                salary: {
                    select: {
                        id: false,
                        low_end: true,
                        high_end: true,
                        periodicity: true,
                        currency: true
                    }
                }
            },
        });

        res.send({
            success:true,
            message: "successful",
            data: jobPosts
        });

    } catch (error) {

        console.log(error);

        if (error instanceof Prisma.PrismaClientKnownRequestError) {

                return res.status(400).json({
                    status: false,
                    message: error,
                });

        }

        return res.status(400).json({
            status: false,
            message: error
        })
    }
}
