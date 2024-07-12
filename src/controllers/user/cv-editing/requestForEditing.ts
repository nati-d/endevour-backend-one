import { Response, Request } from "express";
import ApiResponse from "../../../types/response";
import prisma from "../../../prisma/client/prismaClient";

const requestForEditing = async (req: Request, res: Response) => {
  try {
    const userId = req.auth.id;

    const createdRequest = await prisma.cv_editing_requests.create({
      data: {
        user_id: userId,
      },
    });
    return res
      .status(201)
      .json(
        new ApiResponse(true, "Request created successfully.", createdRequest)
      );
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(
        new ApiResponse(false, "Failed to create request please try again.")
      );
  }
};

export default requestForEditing;
