import { Request, Response } from "express";
import prisma from "../../prisma/client/prismaClient";
import ApiResponse from "../../types/response";

const getTenders = async (req: Request, res: Response) => {
  const page = req.query.page as string;
  const tendersPerPage = 10;

  try {
    let tenders;
    let numberOfPages;

    if (page) {
      const totalTenders = await prisma.tender.count();

      numberOfPages = Math.ceil(totalTenders / tendersPerPage);

      tenders = await prisma.tender.findMany({
        skip: (parseInt(page) - 1) * tendersPerPage,
        take: tendersPerPage,

        include: {
          files: true,
        },
      });
    } else {
      tenders = await prisma.tender.findMany({
        include: {
          files: true,
        },
      });
    }

    return res.status(200).json(
      new ApiResponse(true, "Tenders getted successfully.", {
        tenders,
        total_pages: numberOfPages,
      })
    );
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(
        new ApiResponse(false, "Something went wrong while getting tendrs.")
      );
  }
};

export default getTenders;
