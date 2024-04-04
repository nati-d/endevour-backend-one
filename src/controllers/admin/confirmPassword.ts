import { Request, Response } from "express";
import prisma from "../../prisma/client/prismaClient";
import bcrypt from "bcrypt";
import ApiResponse from "../../types/response";
const confirmPassword = async (req: Request, res: Response) => {
  const id = req.auth?.id;
  const password = req.query.password as string;
  console.log(password, id);
  try {
    const getAdmin = await prisma.admin.findFirst({
      where: {
        id,
      },
    });

    if (getAdmin) {
      const checkPassword = await bcrypt.compare(password, getAdmin.password);
      if (checkPassword) {
        return res
          .status(200)
          .json(new ApiResponse(true, "Password confirmed."));
      } else {
        return res
          .status(400)
          .json(new ApiResponse(false, "The requested password is invalid."));
      }
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(
        new ApiResponse(
          false,
          "Error while trying to confirm password please tyy again."
        )
      );
  }
};

export default confirmPassword;
