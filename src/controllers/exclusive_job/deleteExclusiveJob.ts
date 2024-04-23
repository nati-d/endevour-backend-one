import { Request, Response } from "express";
import prisma from "../../prisma/client/prismaClient";
import ApiResponse from "../../types/response";

const deleteExclusiveJob = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.exclusive_job.delete({
      where: {
        id: parseInt(id),
      },
    });

    return res
      .status(204)
      .json(new ApiResponse(false, "Deleted successfully."));
  } catch (error) {
    console.log(error);

    return res
      .status(500)
      .json(new ApiResponse(false, "Failed to delete job!", null, error));
  }
};

export default deleteExclusiveJob;
