import prisma from "../../prisma/index";
import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import _ from "lodash";
import Validator from "../../validation/index";
import ApiResponse from "../../types/response";

export default async (req: Request, res: Response) => {

    const { error } = Validator.sp.updateSp.validate(req.body);
    if (error) {
        return res.status(400).json(new ApiResponse(false, "unidentified request content", error.details));
    }

    let updatedSp: any;

    try {
        updatedSp = await prisma.client.service_provider.update({
            where: { id: req.body.id },
            data: {
                email: req.body.email,
                phone: req.body.phone,
                about: req.body.about,
                service_category: req.body.service_category
            },
        });

        if (updatedSp.password) delete updatedSp.password;

        return res.status(200).json(new ApiResponse(true, "service provider updated successfully", updatedSp));

    } catch (error) {

        console.error("Error while updating job post: ", error);

        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if ( error.code === "P2022" )
            return res.status(403).json(new ApiResponse(false, "not authorized to post blogs", error));

            if ( error.code === "P2016" )
            return res.status(404).json(new ApiResponse(false, "resource to be updated not found", error));
        }

        res.status(500).json(new ApiResponse(false, "Unknown error at updating job post", error));

    }
};

