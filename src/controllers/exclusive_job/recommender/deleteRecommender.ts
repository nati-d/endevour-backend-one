import { Request, Response } from "express";
import prisma from "../../../prisma/client/prismaClient";
import ApiResponse from "../../../types/response";

const deleteRecommender = async (req: Request, res: Response) => {
  const { recommender_id } = req.params;
  try {
    await prisma.recommender.delete({
      where: { id: Number(recommender_id) },
    });

    return res.status(204).end();
  } catch (error) {
    console.error("Error deleting recommender:", error);
    res.status(500).json(new ApiResponse(false, "Error deleting recommender"));
  }
};

export default deleteRecommender;
