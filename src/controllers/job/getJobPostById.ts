import prisma from "../../prisma/index";
import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import _, { parseInt } from "lodash";
import ApiResponse from "../../types/response";

export default async (req: Request, res: Response) => {
    try {
        let id = parseInt(req.query.id as string) || req.body.id;

        let jobPost: any;

        jobPost = await prisma.client.job_post.findFirst({
            where : { id },
            include: {
                salary: {
                    select: {
                        id: false,
                        low_end: true,
                        high_end: true,
                        periodicity: true,
                        currency: true
                    }
                },
                tags: { select: { name: true } }
            }
        })

        if (jobPost)
        return res.status(200).json(new ApiResponse(true, "job post fetched successfully", jobPost))
        else
        return res.status(204).json(new ApiResponse(false, "job post does not exit", jobPost))
    } catch (error) {
        console.error(error);

        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2022")
            return res.status(403).json(new ApiResponse(false, "not authorized to get job posts"))
        }

        return res.status(400).json(new ApiResponse(false, "error while getting job post"));
    }

}
