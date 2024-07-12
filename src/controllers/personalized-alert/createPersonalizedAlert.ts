import { Request, Response } from "express";
import prisma from "../../prisma/client/prismaClient";
import ApiResponse from "../../types/response";

const createPersonalizedAlert = async (req: Request, res: Response) => {
  try {
    const { name, repetition, alert_for } = req.body;
    if (!name || !repetition || !alert_for)
      return res
        .status(400)
        .json(new ApiResponse(false, "Invalide data set or type."));

    const userId = req.auth.id;

    const createAlert = await prisma.personalized_alerts.create({
      data: {
        name,
        repetition,
        user_id: userId,
        alert_for,
      },
    });

    return res
      .status(201)
      .json(
        new ApiResponse(
          true,
          "Personalized alert created successfully.",
          createAlert
        )
      );
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(
        new ApiResponse(
          false,
          "Failed while inserting personaliezed alert",
          null,
          error
        )
      );
  }
};

export default createPersonalizedAlert;
