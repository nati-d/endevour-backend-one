import { Request, Response } from "express";
import prisma from "../../../prisma/client/prismaClient";
import ApiResponse from "../../../types/response";
import _ from "lodash";
import { Recommender } from "../../../types/types";
import Validator from "../../../validation";
import { Prisma } from "@prisma/client";

const createRecommender = async (req: Request, res: Response) => {
  try {
    const { error } = Validator.recommender.Recommender.validate(req.body);
    if (error)
      return res.status(400).json(new ApiResponse(false, error.message));

    if (!req.auth) return;

    const { first_name, last_name, email, password } = req.body as Recommender;
    const verified_by = req.auth?.id;

    const newRecommender = await prisma.recommender.create({
      data: {
        first_name,
        last_name,
        email,
        verified_by,
      },
    });

    return res.status(201).json(
      new ApiResponse(
        true,
        "Recommender created successfully.",
        _.pickBy(newRecommender, (value, key) => key !== "password")
      )
    );
  } catch (error) {
    console.error("Error creating recommender:", error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002")
        return res
          .status(400)
          .json(new ApiResponse(false, "Recommender email already exists!"));
    }

    return res
      .status(500)
      .json(
        new ApiResponse(
          false,
          "Failed while creating recommender please try again",
          error
        )
      );
  }
};

export default createRecommender;
