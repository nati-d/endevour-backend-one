import { Request, Response } from "express";
import prisma from "../../prisma/client/prismaClient";
import ApiResponse from "../../types/response";

const getTags = async (req: Request, res: Response) => {
  const { page } = req.query;
  const tagsPerPage = 10;

  try {
    const totalTags = await prisma.tag.count();

    const tags = await prisma.tag.findMany({
      skip: page ? (parseInt(page.toString()) - 1) * tagsPerPage : undefined,
      take: tagsPerPage,
    });

    const numberOfPages = Math.ceil(totalTags / tagsPerPage);

    return res.status(200).json(
      new ApiResponse(true, "Tags getted successfully.", {
        tags,
        totalPages: numberOfPages,
        currentPage: Number(page),
        nextPage:
          page && parseInt(page?.toString()) < numberOfPages
            ? parseInt(page.toString()) + 1
            : null,
      })
    );
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(new ApiResponse(false, "Failed to get tags!", null, error));
  }
};

export default getTags;
