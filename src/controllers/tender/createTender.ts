import { Request, Response } from "express";
import prisma from "../../prisma/client/prismaClient";
import ApiResponse from "../../types/response";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

const createTender = async (req: Request, res: Response) => {
  try {
    const { tags, new_tags } = req.body;

    if (req.auth?.is_admin) {
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
        status: req.body.status,
        category: parseInt(req.body.category),
        opportunity_size: parseInt(req.body.opportunity_size),
        opening_date: req.body.opening_date,
        closing_date: req.body.closing_date,
        posted_by: req.body.posted_by,
        verified_by: req.body.verified_by,
        files: {
          createMany: {
            data: files.map((file: Express.Multer.File) => ({
              file: file.filename,
            })),
          },
        },
        tags: {
          connect: JSON.parse(tags),
          create: JSON.parse(new_tags),
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

    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2002")
        return res
          .status(400)
          .json(new ApiResponse(false, "Tag already exists."));
    }

    return res
      .status(500)
      .json(new ApiResponse(false, "Internal server error", null, error));
  }
};

export default createTender;
