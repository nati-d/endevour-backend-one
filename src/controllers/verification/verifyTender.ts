import { NextFunction, Request, Response } from "express";
import prisma from "../../prisma/client/prismaClient";
import ApiResponse from "../../types/response";
import tenderPostVerification from "../../templates/tenderPostVerification";

const verifyTender = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { tender_id } = req.params;
    const admin_id = req.auth.id;

    const selectTender = await prisma.tender.findFirst({
      where: {
        id: parseInt(tender_id),
        posted_by: { not: null },
        verified_by: null,
      },
    });
    if (!selectTender)
      return res
        .status(400)
        .json(
          new ApiResponse(
            false,
            "Invalid data. Can't find tender with the provided data!"
          )
        );

    const verifiedTender = await prisma.tender.update({
      where: {
        id: parseInt(tender_id),
      },
      data: {
        verified_by: admin_id,
      },
      include: {
        user: {
          select: {
            email: true,
            first_name: true,
            last_name: true,
          },
        },
      },
    });

    if (!verifiedTender.user?.email) return;

    const template = tenderPostVerification(
      `${verifiedTender.user.first_name + " " + verifiedTender.user.last_name}`
    );
    req.emailData = {
      sendTo: verifiedTender.user?.email,
      subject: "Tender post verification",
      html: template,
      otherData: verifiedTender,
      resMessage: "Tender verified successfully.",
      statusCode: 201,
      queryOnFail: async () =>
        await prisma.tender.update({
          where: {
            id: parseInt(tender_id),
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
      .json(new ApiResponse(false, "Failed to verify tender", null, error));
  }
};

export default verifyTender;
