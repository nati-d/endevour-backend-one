import { Request, Response } from "express";
import prisma from "../../prisma/client/prismaClient";
import ApiResponse from "../../types/response";
import Joi from "joi";
import { Prisma } from "@prisma/client";

const ValidateSubscriber = Joi.object({
  email: Joi.string().email(),
  subscribe_for: Joi.string().valid("All", "Tender", "Job"),
});

const emailSubscription = async (req: Request, res: Response) => {
  const { error } = ValidateSubscriber.validate(req.body);
  if (error) return res.status(400).json(new ApiResponse(false, error.message));

  const { email, subscribe_for } = req.body;
  try {
    const addSubscriber = await prisma.email_subscribers.create({
      data: {
        email,
        subscribe_for,
      },
    });
    return res
      .status(200)
      .json(
        new ApiResponse(
          true,
          "User subscribe for " + subscribe_for + " successfully.",
          addSubscriber
        )
      );
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002")
        return res
          .status(400)
          .json(
            new ApiResponse(
              false,
              "User already subscribed to " + subscribe_for,
              null,
              error
            )
          );
    }
  }
};

export default emailSubscription;
