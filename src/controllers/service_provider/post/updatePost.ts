import prisma from "../../../prisma/index";
import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import _ from "lodash";
import Validator from "../../../validation";
import ApiResponse from "../../../types/response";

export default async (req: Request, res: Response) => {

    let postToBeUpdated;
    let postId = parseInt(req.body.id as string);

    try {
        postToBeUpdated = await prisma.client.service_provider_post.findUnique({ where: { id: postId } });

        if(!postToBeUpdated)
        return res.status(404).json(new ApiResponse(false, "post to be updated not found"));
    } catch(error) {
        console.error(error);
        return res.status(500).json(new ApiResponse(false, "error while processing request"));
    }

    try {
        if(postToBeUpdated.posted_by != req.auth.id)
        return res.status(403).json(new ApiResponse(false, "not allowed to update the provided post"));
    } catch(error) {
        console.error(error)
        return res.status(500).json(new ApiResponse(false, "error while processing request"));
    }

    try {
        let updatedPost = await prisma.client.service_provider_post.update({
            where : { id: postId },
            data: {
                body: req.body.body,
                description: req.body.description
            }
        })

        return res.status(201).json(new ApiResponse(true, "post updated successfully", updatedPost));
    } catch(error) {
        console.error(error);
        return res.status(500).json(new ApiResponse(false, "error while processing request"));
    }
}
