import { Request, Response } from "express";
import prisma from "../../../prisma/client/prismaClient";
import ApiResponse from "../../../types/response";
const getAllTenderCategories = async (req: Request, res: Response) => {
  const { page } = req.query;
  const categoriesPerPage = 10;
  try {
    const totalCategories = await prisma.tender_category.count();

    const categories = await prisma.tender_category.findMany({
      skip: page
        ? (parseInt(page.toString()) - 1) * categoriesPerPage
        : undefined,
      take: categoriesPerPage,
    });

    const numberOfPages = Math.ceil(totalCategories / categoriesPerPage);
    return res.json(
      new ApiResponse(true, "Tender categories fetched successfully", {
        categories,
        totalPages: numberOfPages,
        currentPage: Number(page),
        nextPage:
          page && parseInt(page?.toString()) < numberOfPages
            ? parseInt(page.toString()) + 1
            : null,
      })
    );
  } catch (error) {
    console.error("Error fetching tender categories:", error);
    return res
      .status(500)
      .json(new ApiResponse(false, "Internal server error"));
  }
};

export default getAllTenderCategories;
