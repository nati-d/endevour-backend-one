import { Request, Response } from "express";
import prisma from "../../prisma/client/prismaClient";
import ApiResponse from "../../types/response";

const getFeadback = async (req: Request, res: Response) => {
  try {
    const { feadback_id } = req.params;
    const feadback = await prisma.customer_feadbacks.findFirst({
      where: {
        id: parseInt(feadback_id),
      },
    });
    if (!feadback)
      return res.status(404).json(new ApiResponse(false, "Feadback not found"));

    return res
      .status(200)
      .json(new ApiResponse(true, "Feadback getted successfully.", feadback));
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(
        new ApiResponse(
          false,
          "Failed to get feadback please try again",
          null,
          error
        )
      );
  }
};

export default getFeadback;
