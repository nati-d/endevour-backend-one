import { Request, Response } from "express";
import prisma from "../../prisma/client/prismaClient";
import ApiResponse from "../../types/response";

const getFeadbacks = async (req: Request, res: Response) => {
  try {
    const feadbacks = await prisma.customer_feadbacks.findMany();
    return res
      .status(200)
      .json(new ApiResponse(true, "Feadbacks getted successfully.", feadbacks));
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(new ApiResponse(false, "Failed to get feadbacks.", null, error));
  }
};

export default getFeadbacks;
