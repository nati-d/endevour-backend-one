import { Request, Response } from "express";
import prisma from "../../../prisma/client/prismaClient";
import ApiResponse from "../../../types/response";

const createTenderCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const adminId = req.auth?.id;

    if (adminId) {
      const createdCategory = await prisma.tender_category.create({
        data: {
          name,
          verified_by: adminId,
        },
      });

      return res
        .status(201)
        .json(
          new ApiResponse(
            true,
            "Tender category created successfully.",
            createdCategory
          )
        );
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(
        new ApiResponse(false, "Unable to create tender category", null, error)
      );
  }
};

export default createTenderCategory;
