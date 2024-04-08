import { Request, Response } from "express";
import prisma from "../../../prisma/client/prismaClient";
import ApiResponse from "../../../types/response";
import Validator from "../../../validation";

const updateRecommender = async (req: Request, res: Response) => {
  const { error } = Validator.recommender.Recommender.validate(req.body);
  if (error) return res.status(400).json(new ApiResponse(false, error.message));

  const { recommender_id } = req.params;
  const { first_name, last_name, email } = req.body;

  try {
    const updatedRecommender = await prisma.recommender.update({
      where: { id: Number(recommender_id) },
      data: {
        first_name,
        last_name,
        email,
      },
    });

    return res.json(
      new ApiResponse(
        true,
        "Recommender updated successfully.",
        updatedRecommender
      )
    );
  } catch (error) {
    console.error("Error updating recommender:", error);
    res.status(500).json(new ApiResponse(false, "Error updating recommender"));
  }
};

export default updateRecommender;
