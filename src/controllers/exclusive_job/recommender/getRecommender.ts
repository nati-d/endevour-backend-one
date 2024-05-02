import { Request, Response } from "express";
import prisma from "../../../prisma/client/prismaClient";
import ApiResponse from "../../../types/response";
import _ from "lodash";
const getRecommender = async (req: Request, res: Response) => {
  const { recommender_id } = req.params;
  try {
    const recommender = await prisma.user.findUnique({
      where: { id: Number(recommender_id), is_recommender: true },
      include: {
        exclusive_jobs: true,
      },
    });

    if (!recommender) {
      return res
        .status(404)
        .json(new ApiResponse(false, "Recommender not found"));
    }

    return res.status(200).json(
      new ApiResponse(
        true,
        "Recommender fetched successfully.",
        _.pickBy(recommender, (value, key) => key !== "password")
      )
    );
  } catch (error) {
    console.error("Error fetching recommender:", error);
    res.status(500).json(new ApiResponse(false, "Error fetching recommender"));
  }
};

export default getRecommender;
