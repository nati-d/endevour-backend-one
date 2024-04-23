import { Request, Response } from "express";
import prisma from "../../prisma/client/prismaClient";
import ApiResponse from "../../types/response";

const updateExclusiveJob = async (req: Request, res: Response) => {
  try {
    const { description, closing_date, job_id } = req.body;

    const updatedExclusiveJob = await prisma.exclusive_job.update({
      where: {
        id: job_id,
      },
      data: {
        description: description ? description : undefined,
        closing_date: closing_date ? closing_date : undefined,
      },
    });

    return res
      .status(201)
      .json(
        new ApiResponse(
          true,
          "Exclusive job updated successfully.",
          updatedExclusiveJob
        )
      );
  } catch (error) {
    console.log(error);

    return res
      .status(500)
      .json(
        new ApiResponse(
          false,
          "Error while updating exclusive job!",
          null,
          error
        )
      );
  }
};

export default updateExclusiveJob;
