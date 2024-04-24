import { Request, Response } from "express";
import prisma from "../../../prisma/client/prismaClient";
import ApiResponse from "../../../types/response";
import _ from "lodash";

const getRecommenders = async (req: Request, res: Response) => {
  try {
    const recommenders = await prisma.recommender.findMany();
    return res.json(
      new ApiResponse(
        true,
        "Recommenders getted successfully",
        recommenders.map((recommender) =>
          _.pickBy(recommender, (value, key) => key !== "password")
        )
      )
    );
  } catch (error) {
    console.error("Error fetching recommenders:", error);
    return res
      .status(500)
      .json(new ApiResponse(false, "Error fetching recommenders", error));
  }
};

export default getRecommenders;
