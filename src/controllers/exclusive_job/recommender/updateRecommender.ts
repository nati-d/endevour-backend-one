import { Request, Response } from "express";
import prisma from "../../../prisma/client/prismaClient";
import ApiResponse from "../../../types/response";
import Validator from "../../../validation";
import _ from "lodash";
const updateRecommender = async (req: Request, res: Response) => {
  const { error } = Validator.recommender.Recommender.validate(req.body);
  if (error) return res.status(400).json(new ApiResponse(false, error.message));

  const { recommender_id } = req.params;
  const { first_name, last_name, email, phone_number } = req.body;

  try {
    const updatedRecommender = await prisma.user.update({
      where: { id: Number(recommender_id), is_recommender: true },
      data: {
        first_name,
        last_name,
        email,
        phone_number,
      },
    });

    return res.json(
      new ApiResponse(
        true,
        "Recommender updated successfully.",
        _.pickBy(updatedRecommender, (value, key) => key !== "password")
      )
    );
  } catch (error) {
    console.error("Error updating recommender:", error);
    res.status(500).json(new ApiResponse(false, "Error updating recommender"));
  }
};

export default updateRecommender;
