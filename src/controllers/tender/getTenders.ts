import { Request, Response } from "express";
import prisma from "../../prisma/client/prismaClient";
import ApiResponse from "../../types/response";
import verificationFiltering from "../../helpers/verificationFiltering";

const getTenders = async (req: Request, res: Response) => {
  const {
    verified_by,
    page,
    category,
    status,
    tags,
    opportunity_size_lt,
    opportunity_size_gt,
  } = req.query;

  const tendersPerPage = 10;

  try {
    const statusArray = status ? (status as string).split(",") : undefined;
    const tagsArray = tags ? (tags as string).split(",") : undefined;

    let verifiedBy: any;

    if (!req.auth) {
      verifiedBy = {
        not: null,
      };
    }

    if (req.auth && verified_by) {
      verifiedBy = verificationFiltering(parseInt(verified_by.toString()));
    }

    const totalTenders = await prisma.tender.count();

    const tenders = await prisma.tender.findMany({
      skip: page ? (parseInt(page.toString()) - 1) * tendersPerPage : undefined,
      take: tendersPerPage,
      where: {
        verified_by: verifiedBy,
        category: category ? parseInt(category?.toString()) : undefined,
        opportunity_size: {
          lt: opportunity_size_lt
            ? parseInt(opportunity_size_lt.toString())
            : undefined,
          gt: opportunity_size_gt
            ? parseInt(opportunity_size_gt.toString())
            : undefined,
        },
        status: {
          in: statusArray,
        },
        tags: {
          some: {
            name: {
              in: tagsArray,
            },
          },
        },
      },
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

    const numberOfPages = Math.ceil(totalTenders / tendersPerPage);

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
