import { Request, Response } from "express";
import prisma from "../../../prisma/client/prismaClient";
import ApiResponse from "../../../types/response";

const getTenderCategory = async (req: Request, res: Response) => {
  try {
    const category_id = req.query.category_id as string;
    const category = await prisma.tender_category.findFirst({
      where: {
        id: parseInt(category_id),
      },
      orderBy: {
        created_at: "desc",
      },
    });
    if (!category)
      return res
        .status(404)
        .json(new ApiResponse(false, "Invalid category id.", category));

    return res
      .status(200)
      .json(new ApiResponse(true, "Category fetched successfully", category));
  } catch (error) {
    res
      .status(500)
      .json(new ApiResponse(false, "Something went wrong please try again."));
  }
};

export default getTenderCategory;
