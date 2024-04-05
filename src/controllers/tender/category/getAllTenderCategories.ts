import { Request, Response } from "express";
import prisma from "../../../prisma/client/prismaClient";
import ApiResponse from "../../../types/response";
const getAllTenderCategories = async (req: Request, res: Response) => {
  try {
    const categories = await prisma.tender_category.findMany();

    return res.json(
      new ApiResponse(
        true,
        "Tender categories fetched successfully",
        categories
      )
    );
  } catch (error) {
    console.error("Error fetching tender categories:", error);
    return res
      .status(500)
      .json(new ApiResponse(false, "Internal server error"));
  }
};

export default getAllTenderCategories;
