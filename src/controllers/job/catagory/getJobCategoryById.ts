import prisma from "../../../prisma/index";
import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import _, { parseInt } from "lodash";
import ApiResponse from "../../../types/response";

export default async (req: Request, res: Response) => {
    try {
        const category = await prisma.client.job_category.findFirst({
            where: { id: parseInt(req.query.id as string) }
        });

        if (category)
        return res.status(200).json(new ApiResponse(true, "job category fetched successfully", category))
        else
        return res.status(204).json(new ApiResponse(false, "job category does not exit", category))
    } catch (error) {
        console.error(error);

        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2022")
            return res.status(403).json(new ApiResponse(false, "not authorized to get job categories"))
        }

        return res.status(400).json(new ApiResponse(false, "error while getting job category"));
    }

}
