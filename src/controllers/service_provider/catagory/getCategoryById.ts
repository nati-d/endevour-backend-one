import prisma from "../../../prisma/index";
import { Request, Response } from "express";
import ApiResponse from "../../../types/response";

export default async (req: Request, res: Response) => {
    try {
        const category = await prisma.client.service_provider_category.findFirst({
            where: { name: req.query.name as string }
        });

        if (category)
        return res.status(200).json(new ApiResponse(true, "service provider category fetched successfully", category))
        else
        return res.status(204).json(new ApiResponse(false, "service provider category does not exit", category))
    } catch (error) {
        console.error(error);

        return res.status(400).json(new ApiResponse(false, "error while getting service provider category", error));
    }

}
