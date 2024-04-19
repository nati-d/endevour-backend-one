import { Request, Response } from "express";
import prisma from "../../../prisma/client/prismaClient";
import ApiResponse from "../../../types/response";

const createRecommendedApplicant = async (req: Request, res: Response) => {
  const { job_id, recommender_email, first_name, last_name, email } = req.body;
  const cv = req.file?.filename;

  if (!cv)
    return res.status(400).json(new ApiResponse(false, "CV not provided!"));
  try {
    const getJob = await prisma.exclusive_job.findUnique({
      where: {
        id: parseInt(job_id),
      },
    });

    if (!getJob)
      return res
        .status(404)
        .json(new ApiResponse(false, "Job does not exist!"));

    if (new Date() > new Date(getJob.closing_date))
      return res
        .status(403)
        .json(
          new ApiResponse(false, "The application date for this job is passed!")
        );

    const getRecommender = await prisma.recommender.findUnique({
      where: {
        email: recommender_email,
      },
    });

    if (!getRecommender)
      return res
        .status(404)
        .json(
          new ApiResponse(
            false,
            "Recommender does not exist in the recommenders list!"
          )
        );

    const isAuthorized = await prisma.recommender.findFirst({
      where: {
        id: getRecommender.id,
        exclusive_jobs: {
          some: {
            id: getJob.id,
          },
        },
      },
    });

    if (!isAuthorized)
      return res
        .status(401)
        .json(
          new ApiResponse(
            false,
            "You're not authorized to recommend for this job!"
          )
        );

    const createdRecommendedApplicant =
      await prisma.recommended_applicant.create({
        data: {
          email,
          first_name,
          last_name,
          cv,
          job: getJob.id,
          recommender: getRecommender.id,
        },
      });

    return res
      .status(201)
      .json(
        new ApiResponse(
          true,
          "Recommendation completed successfully.",
          createdRecommendedApplicant
        )
      );
  } catch (error) {
    console.log(error);

    return res
      .status(500)
      .json(
        new ApiResponse(
          false,
          "Failed to record recommendation please try again!",
          null,
          error
        )
      );
  }
};

export default createRecommendedApplicant;
