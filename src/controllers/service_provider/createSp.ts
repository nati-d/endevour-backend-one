import prisma from "../../prisma/index";
import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import _ from "lodash";
import Validator from "../../validation";
import ApiResponse from "../../types/response";

export default async (req: Request, res: Response) => {

    try {
        const { error } = Validator.sp.createSp.validate(req.body);

        if (error) {
            return res.status(400).send(new ApiResponse(false, "unidentified request content", error.details));
        }
    } catch (error) {
        return res.status(400).send(new ApiResponse(false, "Error at request validation", error));
    }

    try {

        const sp = await prisma.client.service_provider.create({
            data: {
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                about: req.body.about,
                service_category: {
                    connect: req.body.tags.map((name: string) => ({
                        name: name,
                    }))
                }
            }
        });

        console.log(sp);

    } catch(error) {

        console.log(error);

    }
}
