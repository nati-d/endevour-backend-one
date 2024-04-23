import { Request, Response } from "express";
import prisma from "../../../prisma/client/prismaClient";
import ApiResponse from "../../../types/response";

const getRecommendedApplicants = async (req: Request, res: Response) => {
  const { job_id } = req.query;
  try {
    const getApplicants = await prisma.recommended_applicant.findMany({
      where: {
        job: job_id ? parseInt(job_id?.toString()) : undefined,
      },
      include: {
        exclusive_job: true,
      },
    });

    return res
      .status(200)
      .json(
        new ApiResponse(
          true,
          "Applicants for this job getted successfully. ",
          getApplicants
        )
      );
  } catch (error) {
    console.log(error);

    return res
      .status(500)
      .json(
        new ApiResponse(
          false,
          "Failed to get applicants! please try again",
          null,
          undefined
        )
      );
  }
};

export default getRecommendedApplicants;
