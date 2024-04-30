import prisma from "../../prisma/index";
import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import _ from "lodash";
import Validator from "../../validation/index";
import ApiResponse from "../../types/response";

export default async (req: Request, res: Response) => {

    const { error } = Validator.job.updateJobPost.validate(req.body);
    if (error) {
        return res.status(400).json(new ApiResponse(false, "unidentified request content", error.details));
    }

    let updatedJobPost;
    let updatedJobPostSalary;

    try {

        if (req?.auth?.role == "ADMIN" || req?.auth?.role == "SUPER_ADMIN") {
            updatedJobPost = await prisma.client.job_post.update({
                where: { id: req.body.id },
                data: {
                    verified_by: req.body.verify ? req.auth?.id : req.body.verify == false ? null : undefined,
                    title: req.body.title,
                    overview: req.body.overview,
                    body: req.body.body,
                    contract_type: req.body.contract_type,
                    year_of_experience: req.body.year_of_experience,
                    category: req.body.category,
                    closing_date: new Date(req.body.closing_date),
                    tags: {
                        connectOrCreate: req.body.tags ? req.body.tags.map((name: string) => ({
                            where: { name },
                            create: { name }
                        })) : [],
                        disconnect: req.body.tags_to_remove ? req.body.tags_to_remove.map((name: string) => ({ name })) : [],
                    }
                }
            });
        }

        else if (!req.auth?.is_admin) {
            const ownership = await prisma.client.job_post.findFirst({ where: { id: req.body.id }, select: { posted_by: true } })

            if(ownership?.posted_by != req.auth?.id)
            return res.status(403).json(new ApiResponse(false, "unable to update job post due to ownership of the post!"));

            updatedJobPost = await prisma.client.job_post.update({
                where: { id: req.body.id },
                data: {
                    title: req.body.title,
                    overview: req.body.overview,
                    body: req.body.body,
                    contract_type: req.body.contract_type,
                    year_of_experience: req.body.year_of_experience,
                    category: req.body.category,
                    closing_date: new Date(req.body.closing_date),
                    tags: {
                        connectOrCreate: req.body.tags.map((name: string) => ({
                            where: { name },
                            create: { name }
                        })),
                        disconnect: req.body.tags_to_remove.map((name: string) => ({ name })),
                    },
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

        res.status(200).json(new ApiResponse(true, "Job post updated successfully", _.merge(updatedJobPost, updatedJobPostSalary)));

    } catch (error) {

        console.error("Error while updating job post:", error);

        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if ( error.code === "P2022" )
            return res.status(403).json(new ApiResponse(false, "not authorized to post blogs", error));

            if ( error.code === "P2016" )
            return res.status(404).json(new ApiResponse(false, "resource to be updated not found", error));
        }

        res.status(500).json(new ApiResponse(false, "Unknown error at updating job post", error));

    }
};

