import prisma from "../../../prisma/index";
import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import _, { parseInt } from "lodash";
import ApiResponse from "../../../types/response";

export default async (req: Request, res: Response) => {
  try {
    let jobPosts: any;
    let totalPages: number = 0;
    let page = req.query.page
      ? (parseInt(req.query.page as string) - 1) * 10
      : req.body.page
      ? (req.body.page - 1) * 10
      : 0;
    let currentPage = page ? page / 10 + 1 : 1;

    jobPosts = await prisma.client.job_category.findMany({
      take: 10,
      skip: page,
      orderBy: {
        id: "desc",
      },
    });

    totalPages = await prisma.client.job_category.count();

    totalPages = Math.ceil(totalPages / 10);

    res.status(200).json(
      new ApiResponse(true, "jop posts fetched successfully", {
        job_category: jobPosts,
        total_pages: totalPages,
        current_page: currentPage,
        next_page: currentPage >= totalPages ? null : currentPage + 1,
      })
    );
  } catch (error) {
    console.log(error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2022")
        return res
          .status(400)
          .json(new ApiResponse(false, "Not authorized to get categories"));
    }

    return res
      .status(500)
      .json(new ApiResponse(false, "Error while fetching job post categories", error));
  }
};
