import prisma from "../../prisma/index";
import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import Validator from "../../validation/index";
import ApiResponse from "../../types/response";

export default async (req: Request, res: Response) => {
  try {
    const { error } = Validator.grant.getGrant.validate(req.body);

    if (error) {
      return res.status(400).json(new ApiResponse(false, "unidentified request content", error.details));
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Error at request validation",
      data: error,
    });
  }

  try {
    const newgrant = await prisma.client.grant.findMany({
      where: {
        id: req.body.id,
        title: req.body.title,
        opportunity_number: req.body.opportunity_number,
        CFDA: req.body.cdfa,
        created_at: {
          gte: req.body?.date?.lower_bound,
          lte: req.body?.date?.upper_bound,
        },
        tags: { some: { id: { in: req.body.tags } } },
      },
      include: {
        tags: {
          select: {
            id: true,
          },
        },
      },
    });

    res.status(201).json({
      success: true,
      message: "grant gotted successfully",
      data: newgrant,
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2022"
    ) {
      return res.status(400).json({
        success: false,
        message: "Not authorized to post grant",
        data: error,
      });
    }

    console.error("Error while posting grant:", error);
    return res.status(500).json({
      success: false,
      message: "Error while posting grant",
      data: error,
    });
  }
};
