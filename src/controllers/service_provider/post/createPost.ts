import prisma from "../../../prisma/index";
import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import _ from "lodash";
import Validator from "../../../validation";
import ApiResponse from "../../../types/response";

export default async (req: Request, res: Response) => {

    // console.log("**body: ", req.body)
    // console.log("**auth: ", req.auth)
    try {
        let post = await prisma.client.service_provider_post.create({
            data: {
                posted_by: req.auth.id,
                description: req.body.description,
                body: req.body.body,
            }
        });

        return res.status(201).json(new ApiResponse(true, "post created successfully", post));
    } catch(error) {
        console.error(error);
        return res.status(500).json(new ApiResponse(false, "error while processing request", error));
    }
}
