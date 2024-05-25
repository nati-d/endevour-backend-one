import { Request, Response } from "express";
import prisma from "../../prisma/client/prismaClient";
import ApiResponse from "../../types/response";

const searchByKeyWord = async (req: Request, res: Response) => {
  try {
    const searchKeyWord = req.query.keyword;

    const results = await prisma.news.findMany({
      where: {
        OR: [
          {
            title: {
              contains: searchKeyWord?.toString(),
            },
          },
          {
            tags: {
              some: {
                name: {
                  contains: searchKeyWord?.toString(),
                },
              },
            },
          },
        ],
      },
      include: {
        tags: true,
      },
    });

    return res
      .status(200)
      .json(new ApiResponse(true, "Search results. ", results));
  } catch (error) {
    return res
      .status(500)
      .json(
        new ApiResponse(false, "Failed to get search results", null, error)
      );
  }
};

export default searchByKeyWord;
