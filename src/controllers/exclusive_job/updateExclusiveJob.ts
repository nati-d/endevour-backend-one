import { Request, Response } from "express";
import prisma from "../../prisma/client/prismaClient";
import ApiResponse from "../../types/response";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

const updateExclusiveJob = async (req: Request, res: Response) => {
  try {
    const { description, closing_date } = req.body;
    const { id } = req.params;
    const updatedExclusiveJob = await prisma.exclusive_job.update({
      where: {
        id: parseInt(id),
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
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2025")
        return res.status(400).json(new ApiResponse(false, "Invalid job id"));
    }
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
