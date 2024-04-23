import { NextFunction, Request, Response } from "express";
import prisma from "../../../prisma/client/prismaClient";
import ApiResponse from "../../../types/response";

const acceptDeclineApplicant = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { job_id, applicant_id } = req.body;

  try {
    const getApplicant = await prisma.recommended_applicant.findFirst({
      where: {
        id: applicant_id,
        job: job_id,
      },
    });

    if (!getApplicant)
      return res
        .status(400)
        .json(
          new ApiResponse(false, "Ivalid information about the applicant!")
        );

    const updatedApplicant = await prisma.recommended_applicant.update({
      where: {
        id: getApplicant.id,
      },
      data: {
        accepted: true,
        verified_by: req.auth?.id,
      },
    });

    req.emailData = {
      sendTo: getApplicant.email,
      subject: "Application Accesptance Confirmation",
      html: "<b> You are accepted successfully</b>",
      otherData: updatedApplicant,
      queryOnFail: async () =>
        await prisma.recommended_applicant.update({
          where: {
            id: getApplicant.id,
          },
          data: {
            accepted: null,
            verified_by: null,
          },
        }),
    };

    next();
  } catch (error) {
    console.log(error);

    return res
      .status(500)
      .json(
        new ApiResponse(
          false,
          "Failed to update applicant please try again!",
          null,
          error
        )
      );
  }
};

export default acceptDeclineApplicant;
