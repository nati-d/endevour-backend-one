import { NextFunction, Request, Response } from "express";
import prisma from "../../../prisma/client/prismaClient";
import ApiResponse from "../../../types/response";
import _, { has } from "lodash";
import { User } from "../../../types/types";
import Validator from "../../../validation";
import { Prisma } from "@prisma/client";
import hashPassword from "../../../helpers/hashPassword";
import recommenderInvitation from "../../../templates/recommenderInvitation";

const createRecommender = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { error } = Validator.recommender.Recommender.validate(req.body);

    if (error)
      return res.status(400).json(new ApiResponse(false, error.message));

    const { first_name, last_name, email, password, phone_number } =
      req.body as User;

    const verified_by = req.auth?.id;

    const hashedPassword = await hashPassword(password);

    const newRecommender = await prisma.user.create({
      data: {
        first_name,
        last_name,
        email,
        password: hashedPassword,
        phone_number,
        is_recommender: true,
        verified_by,
      },
    });

    req.emailData = {
      sendTo: email,
      subject: "Invited to be recommender of endevour exclusive job.",
      html: recommenderInvitation(first_name),
      statusCode: 201,
      resMessage: "Recommender created successfully.",
      otherData: _.pickBy(newRecommender, (value, key) => key !== "password"),
      queryOnFail: async () =>
        await prisma.user.delete({
          where: {
            id: newRecommender.id,
          },
        }),
    };

    next();
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
