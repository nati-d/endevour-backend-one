import prisma from "../../../prisma/index";
import { Request, Response } from "express";
import _, { parseInt } from "lodash";
import ApiResponse from "../../../types/response";

export default async (req: Request, res: Response) => {

  try {
    let totalPages: number = 0;
    let page = req.query.page ? ( parseInt(req.query.page as string) - 1 ) * 10 :req.body.page ? ( req.body.page - 1 ) * 10 : 0;
    let currentPage = page ? page / 10 + 1 : 1;

    let where = {
      posted_by: req.query.posted_by ? parseInt( req.query.posted_by as string ) : undefined,
    }

    let post = await prisma.client.service_provider_post.findMany({
      take: 10,
      skip: page,
      where,
      orderBy: { created_at: 'desc' }
    });

    totalPages = await prisma.client.service_provider_post.count({ where });
    totalPages = Math.ceil( totalPages / 10 );

    return res.status(200).json(new ApiResponse(true, "data fetched successfully", {
      posts: post,
      current_page: currentPage,
      next_page: currentPage >= totalPages ? null : currentPage + 1,
      total_pages: totalPages } ));
  } catch(error) {
    console.error(error);
    return res.status(500).json(new ApiResponse(false, "error while processing request"));
  }
}
