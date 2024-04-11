import { Request, Response } from "express";
import prisma from "../../../prisma/client/prismaClient";
import ApiResponse from "../../../types/response";
import _ from "lodash";

const verifyForgotPassword = async (req: Request, res: Response) => {
  const { email, code_id, code } = req.body;

  try {
    const getCode = await prisma.password_reset.findFirst({
      where: {
        id: code_id,
        email,
      },
    });

    if (!getCode || getCode.confirmation_code !== code)
      return res
        .status(400)
        .json(new ApiResponse(false, "Invalide confirmation code."));

    await prisma.password_reset.update({
      where: {
        id: code_id,
        email,
      },
      data: {
        verified: true,
      },
    });

    return res
      .status(200)
      .json(new ApiResponse(true, "Code confirmed!", { code_id: getCode.id }));
  } catch (error) {
    return res
      .status(500)
      .json(new ApiResponse(false, "Something went wrong please try again"));
  }
};
export default verifyForgotPassword;
