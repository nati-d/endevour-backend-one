// deleteTenderCategory.ts
import { Request, Response } from "express";
import prisma from "../../../prisma/client/prismaClient";
import ApiResponse from "../../../types/response";

const deleteTenderCategory = async (req: Request, res: Response) => {
  try {
    const { category_id } = req.query;

    await prisma.tender_category.delete({
      where: { id: Number(category_id) },
    });

    res.json(new ApiResponse(true, "Tender category deleted successfully"));
  } catch (error) {
    res
      .status(500)
      .json(new ApiResponse(false, "Unable to delete tender category"));
  }
};

export default deleteTenderCategory;
