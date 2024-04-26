import prisma from "../../prisma/index";
import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import Validator from "../../validation/index";
import ApiResponse from "../../types/response";

export default async (req: Request, res: Response) => {

    try {
        let id = parseInt(req.query.id as string) || req.body.id;
        let verified_by = parseInt(req.query.verified_by as string) || req.body.verified_by;
        let sp_category = req.body.service_category as string; 

        let where = {
            id,
            verified_by,
            service_category: sp_category, 
        }

        let service_provider: any;
        let totalPages: number = 0;
        let page = req.query.page ? ( parseInt(req.query.page as string) - 1 ) * 10 :req.body.page ? ( req.body.page - 1 ) * 10 : 0;

        service_provider = await prisma.client.service_provider.findMany({
            take: 10,
            skip: page,
            where,
            orderBy: { id: 'desc' }
        });

        totalPages = await prisma.client.service_provider.count({ where });

        totalPages = Math.ceil( totalPages / 10 );

        let __sp_category = await prisma.client.service_provider.findMany({
            where: {
                service_category: sp_category
            },
            select: {
                name: true
            }
        });

        let _sp_category = __sp_category.map(data => data.name);

        res.status(200).json(new ApiResponse(true, "service provider fetched successfully", { service_provider: service_provider, total_pages: totalPages, service_category: _sp_category }));

    } catch (error) {

        console.error("Error while posting service provider:", error);

        if ( error instanceof Prisma.PrismaClientKnownRequestError ) {
            if ( error.code === "P2022" )
            return res.status(400).json(new ApiResponse(false, "Not authorized to post service provider", error));
        }

        return res.status(500).json(new ApiResponse(false, "Error while posting service provider", error));
    }
};
