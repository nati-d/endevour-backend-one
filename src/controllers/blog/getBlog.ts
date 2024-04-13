import prisma from "../../prisma/index";
import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import _ from "lodash";
import Validator from "../../validation/index";
import ApiResponse from "../../types/response";

export default async (req: Request, res: Response) => {
    const { error } = Validator.blog.getBlog.validate(req.body);

    if (error) {
        return res.status(400).json(new ApiResponse(false, "unidentified request content", error.details));
    }

    try {
        let blog: any;
        let totalPages: number = 0;
        let page = req.body.page ? ( req.body.page - 1 ) * 10 : 0;

        if (req.auth?.role == "ADMIN" || req.auth?.role == "SUPER_ADMIN") {
            blog = await prisma.client.blog.findMany({
                take: 10,
                skip: page,
                where: {
                    id: req.body.id,
                    title: req.body.title,
                    verified_by: req.body.verified_by,
                    posted_by: req.body.posted_by,
                    created_at: {
                        gte: req.body?.date?.lower_bound,
                        lte: req.body?.date?.upper_bound,
                    },
                    tags: req.body.tags && req.body.tags.length > 0 ? { some: { name: { in: req.body.tags } } } : {}
                },
                include: {
                    tags: {
                        select: {
                            name: true,
                        },
                    },
                },
                orderBy: {
                    id: 'desc'
                }
            });

            totalPages = await prisma.client.blog.count({
                where: {
                    id: req.body.id,
                    title: req.body.title,
                    verified_by: req.body.verified_by,
                    posted_by: req.body.posted_by,
                    created_at: {
                        gte: req.body?.date?.lower_bound,
                        lte: req.body?.date?.upper_bound,
                    },
                    tags: req.body.tags && req.body.tags.length > 0 ? { some: { name: { in: req.body.tags } } } : {}
                }
            });

            totalPages = Math.ceil( totalPages / 10 )
        }


        else
        blog = await prisma.client.blog.findMany({
            take: 1,
            skip: 3,
            where: {
                id: req.body.id,
                title: req.body.title,
                posted_by: req.body.posted_by,
                created_at: {
                    gte: req.body?.date?.lower_bound,
                    lte: req.body?.date?.upper_bound,
                },
                tags: req.body.tags && req.body.tags.length > 0 ? { some: { name: { in: req.body.tags } } } : {}
            },
            include: {
                tags: {
                    select: {
                        name: true,
                    },
                },
            }
        });

        return res.status(200).json(new ApiResponse(true, "blog gotted successfully", ({blog, totalPages})));

    } catch (error) {
        console.error(error);

        if (error instanceof Prisma.PrismaClientKnownRequestError) {

            if (error.code === "P2022")
            return res.status(403).json(new ApiResponse(false, "not authorized to get blogs"))

        }

        return res.status(400).json(new ApiResponse(false, "error while getting blog"));
    }

}
