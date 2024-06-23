import { NextFunction, Request, Response } from "express";
import prisma from "../../../prisma/client/prismaClient";
import ApiResponse from "../../../types/response";
import sendEmail from "../../../services/notifications/sendEmail";

const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, type } = req.body;
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
    const insertCode = await prisma.password_reset.create({
      data: {
        email,
        confirmation_code: confirmationCode,
      },
    });

    req.emailData = {
      sendTo: email,
      subject: "Password Reset Code.",
      html: `<p> Confirmation code</p>: <b>${confirmationCode}</b>`,
      async queryOnFail() {
        await prisma.password_reset.delete({
          where: {
            id: insertCode.id,
          },
        });
      },
      resMessage: "Confirmation code has been send successfully.",
      statusCode: 201,
      otherData: { codeId: insertCode.id, userId: user.email },
    };
    // return res.status(201).json(
    //   new ApiResponse(true, "Confirmation code has been send successfully.", {
    //     codeId: insertCode.id,
    //     userId: user.email,
    //   })
    // );
    next();
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
};

export default forgotPassword;
