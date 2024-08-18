import prisma from "../../prisma/index";
import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import _ from "lodash";
import ApiResponse from "../../types/response";

export default async (req: Request, res: Response) => {
  try {
    let id = parseInt(req.query.id as string) || undefined;
    let title = (req.query.title as string) || undefined;
    let verified_by = req.auth?.is_admin
      ? parseInt(req.query.verified_by as string) || undefined
      : { not: null };
    let posted_by = parseInt(req.query.posted_by as string) || undefined;
    let date_lower_bound = (req.query.date_lower_bound as string) || undefined;
    let date_upper_bound = (req.query.date_upper_bound as string) || undefined;
    let tags = !req.query.tags
      ? undefined
      : JSON.parse(req.query.tags as string) || undefined;
    let where = {
      id,
      title,
      verified_by:
        verified_by == 0
          ? { not: null }
          : verified_by == -1
          ? null
          : verified_by,
      posted_by,
      created_at: {
        gte: date_lower_bound,
        lte: date_upper_bound,
      },
      tags: tags && tags.length > 0 ? { some: { name: { in: tags } } } : {},
    };

    let blog: any;
    let totalPages: number = 0;
    let page = req.query.page
      ? (parseInt(req.query.page as string) - 1) * 10
      : req.body.page
      ? (req.body.page - 1) * 10
      : 0;
    let currentPage = page ? page / 10 + 1 : 1;

    if (req.auth?.role == "ADMIN" || req.auth?.role == "SUPER_ADMIN") {
      blog = await prisma.client.blog.findMany({
        take: 10,
        skip: page,
        where,
        include: {
          tags: { select: { name: true } },
          user: {
            select: {
              id: true,
              first_name: true,
              last_name: true,
              email: true,
              phone_number: true,
              password: false,
              profile_image: true,
              location: false,
              verified_by: false,
              token: false,
              is_recommender: false,
            },
          },
          admin: {
            select: {
              id: true,
              first_name: true,
              last_name: true,
              email: false,
              phone_number: false,
              password: false,
              role: false,
              profile_image: true,
              created_at: false,
              updated_at: false,
            },
          },
        },
        orderBy: {
          id: "desc",
        },
      });
    } else
      blog = await prisma.client.blog.findMany({
        take: 10,
        skip: page,
        where,

        include: {
          tags: { select: { name: true } },
          user: {
            select: {
              id: true,
              first_name: true,
              last_name: true,
              email: true,
              phone_number: true,
              password: false,
              profile_image: true,
              location: false,
              verified_by: false,
              token: false,
              is_recommender: false,
            },
          },
          admin: {
            select: {
              id: true,
              first_name: true,
              last_name: true,
              email: false,
              phone_number: false,
              password: false,
              role: false,
              profile_image: true,
              created_at: false,
              updated_at: false,
            },
          },
        },
        orderBy: {
          id: "desc",
          created_at: "desc",
        },
      });

    totalPages = await prisma.client.blog.count({ where });

    totalPages = Math.ceil(totalPages / 10);

    let __tags = await prisma.client.tag.findMany({
      where: {
        blog: { some: {} },
      },
      select: {
        name: true,
      },
    });

    let _tags = __tags.map((data) => data.name);

    return res.status(200).json(
      new ApiResponse(true, "blog fetched successfully", {
        blog,
        total_pages: totalPages,
        current_page: currentPage,
        next_page: currentPage >= totalPages ? null : currentPage + 1,
        tags: _tags,
      })
    );
  } catch (error) {
    console.error(error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2022")
        return res
          .status(403)
          .json(new ApiResponse(false, "not authorized to get blogs"));
    }

    return res
      .status(400)
      .json(new ApiResponse(false, "error while getting blog"));
  }
};
