import { Response, Request } from "express";
import prisma from "../../../prisma/client/prismaClient";
import ApiResponse from "../../../types/response";

const getCVEditingRequests = async (req: Request, res: Response) => {
  try {
    const getRequests = await prisma.cv_editing_requests.findMany({
      include: {
        user: {
          select: {
            email: true,
            first_name: true,
            last_name: true,
            phone_number: true,
          },
        },
      },
    });
    return res.status(200).json(
      new ApiResponse(true, "Request geted successfully", {
        requests: getRequests,
      })
    );
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(
        new ApiResponse(
          false,
          "Failed to get cv editing requests.",
          null,
          error
        )
      );
  }
};

export default getCVEditingRequests;
