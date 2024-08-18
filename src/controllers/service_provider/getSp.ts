import prisma from "../../prisma/index";
import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import ApiResponse from "../../types/response";

export default async (req: Request, res: Response) => {
  try {
    let id = parseInt(req.query.id as string) || req.body.id;
    let verified_by = req.auth?.is_admin
      ? parseInt(req.query.verified_by as string)
      : { not: null };
    let sp_category = req.body.service_category as string;

    let where = {
      id,
      verified_by:
        verified_by == 0
          ? { not: null }
          : verified_by == -1
          ? null
          : verified_by,
      service_category: sp_category,
    };
    console.log(where);

    let service_provider: any;
    let totalPages: number = 0;
    let page = req.query.page
      ? (parseInt(req.query.page as string) - 1) * 10
      : req.body.page
      ? (req.body.page - 1) * 10
      : 0;
    let currentPage = page ? page / 10 + 1 : 1;

    service_provider = await prisma.client.service_provider.findMany({
      take: 10,
      skip: page,
      where,
      orderBy: {
        created_at: "desc",
      },
      select: {
        id: true,
        name: true,
        phone: true,
        email: true,
        about: true,
        verified_by: true,
        service_category: true,
        created_at: true,
        updated_at: true,
      },
    });

    totalPages = await prisma.client.service_provider.count({ where });

    totalPages = Math.ceil(totalPages / 10);

    let __sp_category = await prisma.client.service_provider.findMany({
      where: {
        service_category: sp_category,
        verified_by:
          verified_by == 0
            ? { not: null }
            : verified_by == -1
            ? null
            : verified_by,
      },
      select: {
        name: true,
      },
    });

    let _sp_category = __sp_category.map((data) => data.name);

    res
      .status(200)
      .json(
        new ApiResponse(true, "service provider fetched successfully", {
          service_provider: service_provider,
          total_pages: totalPages,
          current_page: currentPage,
          next_page: currentPage >= totalPages ? null : currentPage + 1,
          service_category: _sp_category,
        })
      );
  } catch (error) {
    console.error("Error while posting service provider:", error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2022")
        return res
          .status(400)
          .json(
            new ApiResponse(
              false,
              "Not authorized to post service provider",
              error
            )
          );
    }

    return res
      .status(500)
      .json(
        new ApiResponse(false, "Error while posting service provider", error)
      );
  }
};
