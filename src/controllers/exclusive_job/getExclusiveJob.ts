import { Request, Response } from "express";
import prisma from "../../prisma/client/prismaClient";
import ApiResponse from "../../types/response";

const getExclusiveJob = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const getJob = await prisma.exclusive_job.findFirst({
      where: {
        id: parseInt(id),
      },
      include: {
        recommended_applicants: true,
        recommenders: true,
      },
    });

    if (!getJob)
      return res
        .status(404)
        .json(new ApiResponse(false, "Excluseve job not found!"));

    return res
      .status(200)
      .json(new ApiResponse(true, "Job getted successfully.", getJob));
  } catch (error) {
    console.log(error);

    return res
      .status(500)
      .json(
        new ApiResponse(
          false,
          "Failed to get job please try again!",
          null,
          error
        )
      );
  }
};

export default getExclusiveJob;
