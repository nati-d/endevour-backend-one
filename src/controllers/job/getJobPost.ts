import prisma from "../../prisma/index";
import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import _, { parseInt } from "lodash";
import ApiResponse from "../../types/response";

export default async (req: Request, res: Response) => {
  try {
    let id = parseInt(req.query.id as string) || undefined;
    let contract_type = !req.query.contract_type
      ? undefined
      : JSON.parse(req.query.contract_type as string) || undefined;
    let year_of_experience_lower_bound =
      parseInt(req.query.year_of_experience_lower_bound as string) || undefined;
    let year_of_experience_upper_bound =
      parseInt(req.query.year_of_experience_upper_bound as string) || undefined;
    let category = !req.query.category
      ? undefined
      : JSON.parse(req.query.category as string) || undefined;
    let closing_date_lower_bound =
      (req.query.closing_date_lower_bound as string) || undefined;
    let closing_date_upper_bound =
      (req.query.closing_date_upper_bound as string) || undefined;
    let verified_by = req.auth?.is_admin
      ? parseInt(req.query.verified_by as string) || undefined
      : { not: null };
    let posted_by = parseInt(req.query.posted_by as string) || undefined;
    let salary_low_end =
      parseFloat(req.query.salary_low_end as string) || undefined;
    let salary_high_end =
      parseFloat(req.query.salary_high_end as string) || undefined;
    let periodicity = !req.query.periodicity
      ? undefined
      : JSON.parse(req.query.periodicity as string) || undefined;
    let currency = !req.query.currency
      ? undefined
      : JSON.parse(req.query.currency as string) || undefined;
    let date_lower_bound = (req.query.date_lower_bound as string) || undefined;
    let date_upper_bound = (req.query.date_upper_bound as string) || undefined;
    let tags = !req.query.tags
      ? undefined
      : JSON.parse(req.query.tags as string) || undefined;

    const today = new Date().toISOString();

    let where = {
      id,
      contract_type: { in: contract_type },
      year_of_experience: {
        gte: year_of_experience_lower_bound,
        lte: year_of_experience_upper_bound,
      },
      category: { in: category },
      closing_date: {
        gte: today, 
        ...(closing_date_lower_bound && { gte: closing_date_lower_bound }),
        ...(closing_date_upper_bound && { lte: closing_date_upper_bound }),
      },
      verified_by:
        verified_by == 0
          ? { not: null }
          : verified_by == -1
          ? null
          : verified_by,
      posted_by,
      salary: {
        low_end: { lte: salary_high_end },
        high_end: { gte: salary_low_end },
        periodicity: { in: periodicity },
        currency: { in: currency },
      },
      created_at: {
        gte: date_lower_bound,
        lte: date_upper_bound,
      },
      tags: tags && tags.length > 0 ? { some: { name: { in: tags } } } : {},
    };

    let jobPosts: any;
    let totalPages: number = 0;
    let page = req.query.page
      ? (parseInt(req.query.page as string) - 1) * 10
      : req.body.page
      ? (req.body.page - 1) * 10
      : 0;
    let currentPage = page ? page / 10 + 1 : 1;

    jobPosts = await prisma.client.job_post.findMany({
      take: 10,
      skip: page,
      where,
      include: {
        salary: {
          select: {
            id: false,
            low_end: true,
            high_end: true,
            periodicity: true,
            currency: true,
          },
        },
        tags: { select: { name: true } },
        job_category: {
          select: {
            id: true,
            name: true,
          },
        },
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
        created_at: "desc",
      },
    });

    totalPages = await prisma.client.job_post.count({ where });

    totalPages = Math.ceil(totalPages / 10);

    let __tags = await prisma.client.tag.findMany({
      where: {
        job_post: { some: {} },
      },
      select: {
        name: true,
      },
    });

    let _tags = __tags.map((data) => data.name);

    let __categories = await prisma.client.job_category.findMany({
      where: { job_posts: { some: {} } },
      select: { name: true },
    });

    let _categories = __categories.map((date) => date.name);

    res.status(200).json(
      new ApiResponse(true, "job posts fetched successfully", {
        job_post: jobPosts,
        total_pages: totalPages,
        current_page: currentPage,
        next_page: currentPage >= totalPages ? null : currentPage + 1,
        tags: _tags,
        categories: _categories,
      })
    );
  } catch (error) {
    console.log(error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2022")
        return res
          .status(400)
          .json(new ApiResponse(false, "Not authorized to get get"));
    }

    return res
      .status(500)
      .json(new ApiResponse(false, "Error while fetching job post", error));
  }
};
