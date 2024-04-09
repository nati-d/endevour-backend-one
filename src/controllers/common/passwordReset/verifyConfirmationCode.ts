import { Request, Response } from "express";
import prisma from "../../../prisma/client/prismaClient";
import ApiResponse from "../../../types/response";
import bcrypt from "bcrypt";
import _ from "lodash";

const verifyForgotPassword = async (req: Request, res: Response) => {
  const { email, code_id, code, new_password, type } = req.body;

  if (type !== "admin" && type !== "user")
    return res
      .status(400)
      .json(new ApiResponse(false, "You inserted invalid type."));

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

    const salt = await bcrypt.genSalt(13);
    const hashedPassword = await bcrypt.hash(new_password, salt);
    let updatedUser;

    if (type === "admin") {
      updatedUser = await prisma.admin.update({
        data: {
          password: hashedPassword,
        },
        where: {
          email,
        },
      });
    } else {
      updatedUser = await prisma.user.update({
        where: {
          email,
        },
        data: {
          password: hashedPassword,
        },
      });
    }

    await prisma.password_reset.delete({
      where: {
        id: code_id,
      },
    });

    return res.status(201).json(
      new ApiResponse(
        true,
        "Password rested successfully.",
        _.pickBy(updatedUser, (value, key) => key !== "password")
      )
    );
  } catch (error) {
    return res
      .status(500)
      .json(new ApiResponse(false, "Something went wrong please try again"));
  }
};
export default verifyForgotPassword;
