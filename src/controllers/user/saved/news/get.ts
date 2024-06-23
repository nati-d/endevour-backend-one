import { Request, Response } from 'express';
import prisma from '../../../../prisma/'
import { Prisma } from "@prisma/client";
import ApiResponse from '../../../../types/response';

export default async(req: Request, res: Response) => {
    try {
        let totalPages: number = 0;
        let page = req.query.page ? ( parseInt(req.query.page as string) - 1 ) * 10 :req.body.page ? ( req.body.page - 1 ) * 10 : 0;

        let data = await prisma.client.saved_news.findMany({
            take: 10,
            skip: page,
            where: { user: req.auth.id },
            include: {
                user_: {
                    select: {
                        id: true,
                        first_name: true,
                        last_name: true,
                        email: true,
                        phone_number: true,
                        profile_image: true,
                        location: true,
                    }
                },
                news_: {
                    select: {
                        id: true,
                        title: true,
                        overview: true,
                        body: true,
                        posted_by: true,
                        thumbnail: true,
                    }
                }
            }
        });

        let totalData = await prisma.client.saved_news.count({ where: { user: req.auth.id } });
        totalPages = Math.ceil( totalData / 10 );

        return res.status(200).json(new ApiResponse(true, "data fetched successfully", { data, total_pages: totalPages } ));
    } catch(error) {
        console.log(error);
        return res.status(500).json(new ApiResponse(false, "error while processing request"));
    }
}
