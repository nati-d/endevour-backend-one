import { NextFunction, Request, Response } from "express";
import prisma from "../../prisma/client/prismaClient";
import ApiResponse from "../../types/response";

const verifyServiceProvider = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // SP-> service_provider
    const { SP_id } = req.params;
    const admin_id = req.auth.id;

    const selectSP = await prisma.service_provider.findFirst({
      where: {
        id: parseInt(SP_id),
        verified_by: null,
      },
    });

    if (!selectSP)
      return res
        .status(400)
        .json(
          new ApiResponse(
            false,
            "Invalid data. Can't find service provider post with the provided data!"
          )
        );

    const verifiedSP = await prisma.service_provider.update({
      where: {
        id: parseInt(SP_id),
      },
      data: {
        verified_by: admin_id,
      },
      select: {
        email: true,
      },
    });

    if (!verifiedSP.email) return;

    req.emailData = {
      sendTo: verifiedSP.email,
      subject: "service provider post verification",
      html: "<p> Congratulations your service provider post is verified.",
      otherData: verifiedSP,
      resMessage: "service provider verified successfully.",
      statusCode: 201,
      queryOnFail: async () =>
        await prisma.service_provider.update({
          where: {
            id: parseInt(SP_id),
          },
          data: {
            verified_by: null,
          },
        }),
    };

    next();
  } catch (error) {
    return res
      .status(500)
      .json(
        new ApiResponse(
          false,
          "Failed to verify service provider post",
          null,
          error
        )
      );
  }
};

export default verifyServiceProvider;
