import { Request, Response } from "express";
import prisma from "../../../prisma/client/prismaClient";
import ApiResponse from "../../../types/response";

const getDashboardData = async (req: Request, res: Response) => {
  try {
    const [
      users,
      verifiedServiceProviders,
      unVerifiedServiceProviders,
      verifiedJobs,
      unVerifiedJobs,
      verifiedTenders,
      unVerifiedTenders,
      grants,
      news,
      verifiedBlogs,
      unVerifiedBlogs,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.service_provider.count({
        where: {
          verified_by: {
            not: null,
          },
        },
      }),
      prisma.service_provider.count({
        where: {
          verified_by: null,
        },
      }),
      prisma.job_post.count({
        where: { verified_by: { not: null } },
      }),
      prisma.job_post.count({
        where: { verified_by: null },
      }),
      prisma.tender.count({ where: { verified_by: { not: null } } }),
      prisma.tender.count({ where: { verified_by: null } }),
      prisma.grant.count(),
      prisma.news.count(),
      prisma.blog.count({ where: { verified_by: { not: null } } }),
      prisma.blog.count({ where: { verified_by: null } }),
    ]);

    const datas = {
      users,
      verified_service_providers: verifiedServiceProviders,
      unverified_service_providers: unVerifiedServiceProviders,
      verified_jobs: verifiedJobs,
      unverified_jobs: unVerifiedJobs,
      verified_tenders: verifiedTenders,
      unverified_tenders: unVerifiedTenders,
      verified_blogs: verifiedBlogs,
      unverified_blogs: unVerifiedBlogs,
      grants,
      news,
    };

    return res.status(200).json(new ApiResponse(true, "Dashboard data", datas));
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(
        new ApiResponse(false, "Failed to fetch dashboard data!", null, error)
      );
  }
};

export default getDashboardData;
