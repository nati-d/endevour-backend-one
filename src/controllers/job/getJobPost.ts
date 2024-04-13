import prisma from "../../prisma/index";
import { Prisma } from "@prisma/client"
import { Request, Response } from "express";
import _ from "lodash";
import Validator from "../../validation/index";
import ApiResponse from "../../types/response";

export default async (req: Request, res: Response) => {

    const { error } = Validator.job.getJobPost.validate(req.body);

    if (error)
    return res.status(400).send(new ApiResponse(false, "unidentified request content", error.details));


    try {
        let job: any;
        let totalPages: number = 0;
        let page = req.body.page ? ( req.body.page - 1 ) * 10 : 0;

        const jobPosts = await prisma.client.job_post.findMany({
            take: 10,
            skip: page,
            where: {
                id: req.body.id,
                contract_type: {
                    in: req.body.contract_type
                },
                year_of_experience: {
                    gte: req.body?.year_of_experience?.lower_bound,
                    lte: req.body?.year_of_experience?.upper_bound
                },
                category: {
                    in: req.body.category
                },
                closing_date: {
                    gte: req.body?.closing_date?.lower_bound,
                    lte: req.body?.closing_date?.upper_bound
                },
                salary: {
                    low_end: {
                        lte: req.body?.salary?.high_end,
                    },
                    high_end: {
                        gte: req.body?.salary?.low_end,
                    },
                    periodicity: {
                        in: req.body?.salary?.periodicity
                    },
                    currency: {
                        in: req.body?.salary?.currency,
                    }
                },
                created_at: {
                    gte: req.body?.closing_date?.lower_bound,
                    lte: req.body?.closing_date?.upper_bound
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
            orderBy: {
                id: 'desc'
            }
        });

        totalPages = await prisma.client.job_post.count({
            take: 10,
            skip: page,
            where: {
                id: req.body.id,
                contract_type: {
                    in: req.body.contract_type
                },
                year_of_experience: {
                    gte: req.body?.year_of_experience?.lower_bound,
                    lte: req.body?.year_of_experience?.upper_bound
                },
                category: {
                    in: req.body.category
                },
                closing_date: {
                    gte: req.body?.closing_date?.lower_bound,
                    lte: req.body?.closing_date?.upper_bound
                },
                salary: {
                    low_end: {
                        lte: req.body?.salary?.high_end,
                    },
                    high_end: {
                        gte: req.body?.salary?.low_end,
                    },
                    periodicity: {
                        in: req.body?.salary?.periodicity
                    },
                    currency: {
                        in: req.body?.salary?.currency,
                    }
                },
                created_at: {
                    gte: req.body?.closing_date?.lower_bound,
                    lte: req.body?.closing_date?.upper_bound
                }
            },
        })

        res.status(200).json(new ApiResponse(true, "jop posts fetched successfully", { job_post: jobPosts, total_pages: totalPages }));

    } catch (error) {

        console.log(error);

        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if ( error.code === "P2022" )
                return res.status(400).json(new ApiResponse(false, "Not authorized to get get"));
        }

        return res.status(500).json(new ApiResponse(false, "Error while fetching job post", error));
    }
}
