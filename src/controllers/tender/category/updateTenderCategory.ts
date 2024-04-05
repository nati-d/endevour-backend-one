// updateTenderCategory.ts
import { Request, Response } from "express";
import prisma from "../../../prisma/client/prismaClient";
import ApiResponse from "../../../types/response";

const updateTenderCategory = async (req: Request, res: Response) => {
  try {
    const { category_id } = req.query;
    const { name } = req.body;
    const adminId = req.auth?.id;

    const updatedCategory = await prisma.tender_category.update({
      where: { id: Number(category_id) },
      data: {
        name,
        verified_by: adminId,
      },
    });

    res.json(
      new ApiResponse(
        true,
        "Tender category updated successfully.",
        updatedCategory
      )
    );
  } catch (error) {
    res
      .status(500)
      .json(new ApiResponse(false, "Unable to update tender category"));
  }
};

export default updateTenderCategory;
