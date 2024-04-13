import prisma from "../../prisma/index";
import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import Validator from "../../validation/index";
import ApiResponse from "../../types/response";

export default async (req: Request, res: Response) => {
    const { error } = Validator.grant.getGrant.validate(req.body);

    if (error) {
        return res.status(400).json(new ApiResponse(false, "unidentified request content", error.details));
    }

    try {
        let grant: any;
        let totalPages: number = 0;
        let page: number = req.body.page ? ( req.body.page - 1) * 10 : 0;

        grant = await prisma.client.grant.findMany({
            take: 10,
            skip: page,
            where: {
                id: req.body.id,
                title: req.body.title,
                opportunity_number: req.body.opportunity_number,
                cfda: req.body.cdfa,
                created_at: {
                    gte: req.body?.date?.lower_bound,
                    lte: req.body?.date?.upper_bound,
                },
                tags: req.body.tags && req.body.tags.length > 0 ? { some: { name: { in: req.body.tags } } } : {}
            },
            include: {
                tags: { select: { name: true } }
            },
            orderBy: {
                id: "desc"
            }
        });

        totalPages = await prisma.client.grant.count({
            where: {
                id: req.body.id,
                title: req.body.title,
                opportunity_number: req.body.opportunity_number,
                cfda: req.body.cdfa,
                created_at: {
                    gte: req.body?.date?.lower_bound,
                    lte: req.body?.date?.upper_bound,
                },
                tags: req.body.tags && req.body.tags.length > 0 ? { some: { name: { in: req.body.tags } } } : {}
            },
        })

        return res.status(200).json(new ApiResponse(true, "grants fetched successfully", { grant: grant, total_pages: totalPages }));

    } catch (error) {
        console.error("Error while posting grant:", error);

        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if ( error.code === "P2022" )
            return res.status(400).json(new ApiResponse(false, "Not authorized to get get"));
        }

        return res.status(500).json(new ApiResponse(false, "Error while fetching grants"));
    }
};
