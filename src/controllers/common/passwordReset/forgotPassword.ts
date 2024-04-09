import { Request, Response } from "express";
import prisma from "../../../prisma/client/prismaClient";
import ApiResponse from "../../../types/response";
import sendEmail from "../../../services/notifications/sendEmail";

const forgotPassword = async (req: Request, res: Response) => {
  const email = req.body.email;
  const type = req.body.type;
  let user;

  if (type !== "admin" && type !== "user")
    return res
      .status(400)
      .json(new ApiResponse(false, "You inserted invalid type."));

  try {
    let getUser;
    if (type === "admin") {
      getUser = await prisma.admin.findUnique({
        where: {
          email: email,
        },
      });
    } else {
      getUser = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });
    }

    if (!getUser)
      return res.status(400).json(new ApiResponse(false, "Invalid email."));
    else user = getUser;
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(new ApiResponse(false, "Something went wrong checking user. "));
  }

  const confirmationCode = Math.floor(Math.random() * 10000) + 1;
  try {
    await sendEmail(
      email,
      "Password Reset Code.",
      `<p> Confirmation code</p>: <b>${confirmationCode}</b>`
    );
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(
        new ApiResponse(
          false,
          "Failed to send confirmation code please try later."
        )
      );
  }

  try {
    const insertCode = await prisma.password_reset.create({
      data: {
        email,
        confirmation_code: confirmationCode,
      },
    });

    return res.status(201).json(
      new ApiResponse(true, "Confirmation code has been send successfully.", {
        codeId: insertCode.id,
        userId: user.email,
      })
    );
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(new ApiResponse(false, "Failed while managing confirmation code"));
  }
};

export default forgotPassword;
