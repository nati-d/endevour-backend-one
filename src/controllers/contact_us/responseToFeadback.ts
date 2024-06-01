import { NextFunction, Request, Response } from "express";
import prisma from "../../prisma/client/prismaClient";
import ApiResponse from "../../types/response";

const responseToFeadback = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { feadback_id, subject, body } = req.body;
    const feadback = await prisma.customer_feadbacks.findFirst({
      where: {
        id: parseInt(feadback_id),
      },
    });

    if (!feadback)
      return res
        .status(404)
        .json(new ApiResponse(false, "Feadback not found!"));

    req.emailData = {
      sendTo: feadback.email,
      subject,
      html: body,
      resMessage: "Response sent successfully.",
    };

    next();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(new ApiResponse(false, "Failed to send response please try again"));
  }
};

export default responseToFeadback;
