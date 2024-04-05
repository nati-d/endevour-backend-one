import { Request, Response } from "express";
import prisma from "../../prisma/client/prismaClient";
import ApiResponse from "../../types/response";
import sendEmail from "../../services/notifications/sendEmail";

const forgotPassword = async (req: Request, res: Response) => {
  const email = req.body.email;
  try {
    const checkAdmin = await prisma.admin.findUnique({
      where: {
        email: email,
      },
    });
    if (!checkAdmin)
      return res
        .status(400)
        .json(
          new ApiResponse(
            false,
            "Invalid email. Admin does not exist with this email."
          )
        );

    const confirmationCode = Math.floor(Math.random() * 10000) + 1;
    const insertCode = await prisma.admin_pass_reset.create({
      data: {
        admin_id: checkAdmin?.id,
        confirmation_code: confirmationCode,
      },
    });
    if (insertCode) {
      sendEmail(
        email,
        "Password Reset Code.",
        "Don't share it to anyone.",
        `<p> Confirmation code</p>: <b>${confirmationCode}</b>`
      );
      return res
        .status(201)
        .json(
          new ApiResponse(
            true,
            "Confirmation code has been send successfully.",
            { codeId: insertCode.id, userId: checkAdmin.id }
          )
        );
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(
        new ApiResponse(
          false,
          "Something went wrong while sending confirmation code please try again. "
        )
      );
  }
};

export default forgotPassword;
