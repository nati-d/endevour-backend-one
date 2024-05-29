import { Request, Response } from "express";
import ApiResponse from "../../types/response";
import prisma from "../../prisma/client/prismaClient";

const saveTender = async (req: Request, res: Response) => {
  try {
    const { tender_id } = req.body;
    const user_id = req.auth.id;
    if (!Number.isInteger(tender_id))
      return res
        .status(400)
        .json(new ApiResponse(false, "Invalide tender id."));

    const savedTender = await prisma.saved_tender.create({
      data: {
        tender: tender_id,
        user: user_id,
      },
    });

    return res
      .status(201)
      .json(new ApiResponse(true, "Tender created successfully.", savedTender));
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(
        new ApiResponse(
          false,
          "Failed to save tender please try again",
          null,
          error
        )
      );
  }
};

export default saveTender;
