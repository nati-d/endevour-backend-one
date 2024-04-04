import { Request, Response } from "express";
import prisma from "../../prisma/client/prismaClient";
import ApiResponse from "../../types/response";
import bcrypt from "bcrypt";
import _ from "lodash";

const verifyForgotPassword = async (req: Request, res: Response) => {
  const admin_id = req.body?.admin_id;
  const codeId = req.body.code_id;
  const code = req.body.confirmation_code;
  const newPassword = req.body.new_password;

  try {
    const checkCode = await prisma.admin_pass_reset.findFirst({
      where: {
        id: codeId,
        admin_id,
      },
    });
    if (!checkCode || checkCode.confirmation_code !== code)
      return res
        .status(400)
        .json(new ApiResponse(false, "Invalide confirmation code."));

    const salt = await bcrypt.genSalt(13);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    const updatedAdmin = await prisma.admin.update({
      data: {
        password: hashedPassword,
      },
      where: {
        id: admin_id,
      },
    });

    return res.status(201).json(
      new ApiResponse(
        true,
        "Password rested successfully.",
        _.pickBy(updatedAdmin, (value, key) => key !== "password")
      )
    );
  } catch (error) {
    return res
      .status(500)
      .json(new ApiResponse(false, "Something went wrong please try again"));
  }
};
export default verifyForgotPassword;
