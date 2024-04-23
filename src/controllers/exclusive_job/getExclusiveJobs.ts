import { Request, Response } from "express";
import prisma from "../../prisma/client/prismaClient";
import ApiResponse from "../../types/response";

const getExclusiveJobs = async (req: Request, res: Response) => {
  const { page } = req.query;
  const jobsPerPage = 10;
  try {
    const totalJobs = await prisma.exclusive_job.count();

    const getJobs = await prisma.exclusive_job.findMany({
      skip: page ? (parseInt(page?.toString()) - 1) * jobsPerPage : undefined,
      take: page ? jobsPerPage : undefined,
    });

    return res.status(200).json(
      new ApiResponse(true, "Jobs getted successfully.", {
        jobs: getJobs,
        totalPage: Math.ceil(totalJobs / jobsPerPage),
        currentPage: page,
        nextPage:
          page &&
          parseInt(page?.toString()) < Math.ceil(totalJobs / jobsPerPage)
            ? parseInt(page.toString()) + 1
            : null,
      })
    );
  } catch (error) {
    console.log(error);

    return res
      .status(500)
      .json(
        new ApiResponse(
          false,
          "Failed to get jobs! Please try again",
          null,
          error
        )
      );
  }
};

export default getExclusiveJobs;
