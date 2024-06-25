import { Request, Response } from 'express';
import prisma from '../../../../prisma/'
import ApiResponse from '../../../../types/response';

export default async(req: Request, res: Response) => {
    try {
        let user = req.query?.user ? parseInt(req.query?.user as string) : undefined; 
        let sp = req.query?.service_provider ? parseInt(req.query?.service_provider as string) : undefined;
        let totalPages: number = 0;
        let page = req.query.page ? ( parseInt(req.query.page as string) - 1 ) * 10 :req.body.page ? ( req.body.page - 1 ) * 10 : 0;
        let currentPage = page ? page / 10 + 1 : 1;

        let data = await prisma.client.procurement.findMany({
            take: 10,
            skip: page,
            where: {
                user: user,
                service_provider: sp
            },
            include: {
                user_: {
                    select: {
                        id: true,
                        first_name: true,
                        last_name: true,
                        profile_image: true,
                    }
                },
                service_provider_: {
                    select: {
                        id: true,
                        name: true,
                    }
                }
            }
        });

        let totalData = await prisma.client.procurement.count({
            where: {
                user: user,
                service_provider: sp
            }
        });
        totalPages = Math.ceil( totalData / 10 );

        return res.status(200).json(new ApiResponse(true, "data fetched successfully", {
            data,
            total_pages: totalPages,
            current_page: currentPage,
            next_page: currentPage >= totalPages ? null : currentPage + 1
        }));
    } catch(error) {
        console.log(error);
        return res.status(500).json(new ApiResponse(false, "error while processing request"));
    }
}
