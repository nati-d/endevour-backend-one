import { Request, Response } from "express";
import prisma from "../../prisma/";
import ApiResponse from "../../types/response";
import jwt from "jsonwebtoken";

export default async (req: Request, res: Response) => {
  let userotp: any;
  let user: any;
  try {
    userotp = await prisma.client.user_otps.findFirst({
      where: { email: req.body.email },
    });

    if (!userotp)
      return res
        .status(404)
        .json(new ApiResponse(false, "no otpcode for the email provided"));
  } catch (error) {
    console.error(error);

    return res
      .status(500)
      .json(new ApiResponse(false, "error while processing request"));
  }

  try {
    if (userotp.otp_code != req.body.otp_code)
      return res
        .status(401)
        .json(new ApiResponse(false, "invalid email or code"));
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json(new ApiResponse(false, "error while processing request"));
  }

  try {
    await prisma.client.user_otps.update({
      where: { email: req.body.email },
      data: {
        valid: true,
      },
    });

    user = await prisma.client.user.findFirst({
      where: {
        email: req.body.email,
      },
      include: {
        exclusive_jobs: true,
      },
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json(new ApiResponse(false, "error while processing request"));
  }
  user.is_admin = false;
  delete user.password;
  const token = jwt.sign(user, process.env.JWT_KEY || "");

  return res
    .status(200)
    .json(new ApiResponse(true, "email has been verified", token));
};
