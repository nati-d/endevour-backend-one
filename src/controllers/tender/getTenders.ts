import { Request, Response } from "express";
import prisma from "../../prisma/client/prismaClient";
import ApiResponse from "../../types/response";

const getTenders = async (req: Request, res: Response) => {
  try {
    const tenders = await prisma.tender.findMany({
      include: {
        files: true,
      },
    });

    return res
      .status(200)
      .json(new ApiResponse(true, "Tenders getted successfully.", tenders));
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(
        new ApiResponse(false, "Something went wrong while getting tendrs.")
      );
  }
};

export default getTenders;
