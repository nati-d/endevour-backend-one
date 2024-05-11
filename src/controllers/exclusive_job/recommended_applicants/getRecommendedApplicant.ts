import { Request, Response } from "express";
import prisma from "../../../prisma/client/prismaClient";
import ApiResponse from "../../../types/response";

const getRecommendedApplicant = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const getApplicant = await prisma.recommended_applicant.findFirst({
      where: {
        id: parseInt(id),
      },
      include: {
        exclusive_job: true,
        user: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            profile_image: true,
            email: true,
          },
        },
        admin: {
          select: {
            id: true,
            email: true,
            first_name: true,
            last_name: true,
            role: true,
            profile_image: true,
          },
        },
      },
    });

    if (!getApplicant)
      return res
        .status(404)
        .json(new ApiResponse(false, "Recommended applicant not found!"));

    return res
      .status(200)
      .json(
        new ApiResponse(true, "Applicant getted successfully.", getApplicant)
      );
  } catch (error) {
    console.log(error);

    return res
      .status(500)
      .json(
        new ApiResponse(
          false,
          "Failed to load applicant please try again",
          null,
          error
        )
      );
  }
};

export default getRecommendedApplicant;
