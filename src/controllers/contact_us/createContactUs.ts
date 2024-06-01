import { Request, Response } from "express";
import Joi from "joi";
import ApiResponse from "../../types/response";
import prisma from "../../prisma/client/prismaClient";

const validateFeadback = Joi.object({
  full_name: Joi.string().min(2).required(),
  email: Joi.string().email().email(),
  subject: Joi.string().required(),
  message: Joi.string().required(),
});

const createContactUs = async (req: Request, res: Response) => {
  const { error } = validateFeadback.validate(req.body);
  if (error) return res.status(200).json(new ApiResponse(false, error.message));
  const { full_name, email, subject, message } = req.body;
  try {
    const addFeadback = await prisma.customer_feadbacks.create({
      data: {
        full_name,
        email,
        subject,
        message,
      },
    });

    return res
      .status(201)
      .json(
        new ApiResponse(true, "Feadback registered successfully.", addFeadback)
      );
  } catch (error) {
    console.log(error);

    return res
      .status(500)
      .json(
        new ApiResponse(false, "Failed to register feadback please try again.")
      );
  }
};

export default createContactUs;
