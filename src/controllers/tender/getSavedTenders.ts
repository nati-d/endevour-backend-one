import { Request, Response } from "express";
import prisma from "../../prisma/client/prismaClient";
import ApiResponse from "../../types/response";

const getSavedTenders = async (req: Request, res: Response) => {
  try {
    const userId = req.auth.id;

    const savedTenders = await prisma.saved_tender.findFirst({
      where: {
        user: userId,
      },
      include: {
        tender_: true,
      },
    });

    return res
      .status(200)
      .json(
        new ApiResponse(
          false,
          "Saved tenders getted successfully.",
          savedTenders
        )
      );
  } catch (error) {
    console.log(error);

    return res
      .status(500)
      .json(
        new ApiResponse(
          false,
          "Failed to get saved tenders please try again!",
          null,
          error
        )
      );
  }
};
export default getSavedTenders;
