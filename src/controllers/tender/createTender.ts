import { Request, Response } from "express";
import prisma from "../../prisma/client/prismaClient";
import ApiResponse from "../../types/response";

const createTender = async (req: Request, res: Response) => {
  try {
    if (req.auth?.role) {
      req.body.verified_by = req.auth.id;
      req.body.posted_by = null;
    } else {
      req.body.posted_by = req.auth?.id;
      req.body.verified_by = null;
    }

    const files = Array.isArray(req.files) ? req.files : [];

    const createdTender = await prisma.tender.create({
      data: {
        title: req.body.title,
        overview: req.body.overview,
        body: req.body.body,
        price: parseFloat(req.body.price),
        starting_bid: parseFloat(req.body.starting_bid),
        eligibility: true,
        status: req.body.status,
        category: parseInt(req.body.category),
        opening_date: req.body.opening_date,
        closing_date: req.body.closing_date,
        posted_by: req.body.posted_by,
        verified_by: parseInt(req.body.verified_by),

        files: {
          createMany: {
            data: files.map((file: Express.Multer.File) => ({
              file: file.filename,
            })),
          },
        },
        tags: {
          connectOrCreate: {
            where: {
              id: 1,
            },
            create: {
              name: "tag1",
            },
          },
        },
      },
    });

    return res
      .status(201)
      .json(
        new ApiResponse(true, "Tender created successfully", createdTender)
      );
  } catch (error) {
    console.error("Error creating tender:", error);
    return res
      .status(500)
      .json(new ApiResponse(false, "Internal server error"));
  }
};

export default createTender;
