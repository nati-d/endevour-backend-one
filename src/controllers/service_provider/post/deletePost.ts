import prisma from "../../../prisma/index";
import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import _, { parseInt } from "lodash";
import Validator from "../../../validation";
import ApiResponse from "../../../types/response";

export default async (req: Request, res: Response) => {

    let postToBeDeleted;
    let postId = parseInt(req.query.id as string);

    try {
        postToBeDeleted = await prisma.client.service_provider_post.findUnique({ where: { id: postId } });

        if(!postToBeDeleted)
        return res.status(404).json(new ApiResponse(false, "post to be deleted not found"));
    } catch(error) {
        console.error(error);
        return res.status(500).json(new ApiResponse(false, "error while processing request"));
    }

    try {
        if(postToBeDeleted.posted_by != req.auth.id)
        return res.status(403).json(new ApiResponse(false, "not allowed to delete the provided post"));
    } catch(error) {
        console.error(error)
        return res.status(500).json(new ApiResponse(false, "error while processing request"));
    }

    try {
        let result = await prisma.client.service_provider_post.delete({ where: { id: postId } });
        return res.status(204).json(new ApiResponse(true, "post has been deleted successfully", result));
    } catch(error) {
        console.error(error);
        return res.status(500).json(new ApiResponse(false, "error while processing request"));
    }
}
