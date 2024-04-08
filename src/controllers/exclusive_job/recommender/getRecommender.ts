import { Request, Response } from "express";
import prisma from "../../../prisma/client/prismaClient";
import ApiResponse from "../../../types/response";

const getRecommender = async (req: Request, res: Response) => {
  const { recommender_id } = req.params;
  try {
    const recommender = await prisma.recommender.findUnique({
      where: { id: Number(recommender_id) },
    });
    if (!recommender) {
      return res
        .status(404)
        .json(new ApiResponse(false, "Recommender not found"));
    }
    return res
      .status(200)
      .json(
        new ApiResponse(true, "Recommender fetched successfully.", recommender)
      );
  } catch (error) {
    console.error("Error fetching recommender:", error);
    res.status(500).json(new ApiResponse(false, "Error fetching recommender"));
  }
};

export default getRecommender;
