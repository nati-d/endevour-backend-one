import { Request, Response } from "express";
import prisma from "../../prisma/client/prismaClient";
import ApiResponse from "../../types/response";
import verificationFiltering from "../../helpers/verificationFiltering";

const getTenders = async (req: Request, res: Response) => {
  const { verified_by, page } = req.query;
  const tendersPerPage = 10;

  try {
    let filtering = {};

    if (!req.auth)
      filtering = {
        verified_by: {
          not: null,
        },
      };

    if (req.auth && verified_by) {
      filtering = verificationFiltering(parseInt(verified_by.toString()));
    }

    const tenders = await prisma.tender.findMany({
      skip: page ? (parseInt(page.toString()) - 1) * tendersPerPage : undefined,
      take: tendersPerPage,
      where: filtering,
      include: {
        files: true,
        tender_category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    const numberOfPages = Math.ceil(tenders.length / tendersPerPage);

    return res.status(200).json(
      new ApiResponse(true, "Tenders getted successfully.", {
        tenders,
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
      .json(
        new ApiResponse(false, "Something went wrong while getting tendrs.")
      );
  }
};

export default getTenders;
