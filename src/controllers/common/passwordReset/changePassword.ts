import { Request, Response } from "express";
import ApiResponse from "../../../types/response";
import hashPassword from "../../../helpers/hashPassword";
import prisma from "../../../prisma/client/prismaClient";
import _ from "lodash";

const changePassword = async (req: Request, res: Response) => {
  const { email, code_id, new_password, type } = req.body;

  if (type !== "admin" && type !== "user")
    return res
      .status(400)
      .json(new ApiResponse(false, "You inserted invalid type."));

  try {
    const getCode = await prisma.password_reset.findFirst({
      where: {
        id: code_id,
        email,
        verified: true,
      },
    });

    if (!getCode)
      return res
        .status(400)
        .json(new ApiResponse(false, "Invalide cridentials!"));

    const hashedPassword = await hashPassword(new_password);
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
    console.log(error);

    return res
      .status(500)
      .json(
        new ApiResponse(
          false,
          "Something went wrong while  resetting password please try again!"
        )
      );
  }
};

export default changePassword;
