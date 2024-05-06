import prisma from "../../../prisma/index";
import { Request, Response } from "express";
import _, { parseInt } from "lodash";
import ApiResponse from "../../../types/response";

export default async (req: Request, res: Response) => {

    try {
        let post = await prisma.client.service_provider_post.findFirst({
            where: { id: parseInt( req.query.id as string ) }
        })

        return res.status(200).json(new ApiResponse(true, "data fetched successfully", post));
    } catch(error) {
        console.error(error);
        return res.status(500).json(new ApiResponse(false, "error while processing request"));
    }
}
