import prisma from "../../prisma/index";
import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import Validator from "../../validation/index";
import ApiResponse from "../../types/response";

export default async (req: Request, res: Response) => {
  try {
    const { error } = Validator.blog.getBlog.validate(req.body);

    if (error) {
      return res
        .status(400)
        .json(
          new ApiResponse(false, "unidentified request content", error.details)
        );
    }
  } catch (error) {
    return res
      .status(400)
      .json(new ApiResponse(false, "error while validating request"));
  }

  try {
    let newBlog: any;

    if (req.auth?.role == "ADMIN" || req.auth?.role == "SUPER_ADMIN")
      newBlog = await prisma.client.blog.findMany({
        where: {
          id: req.body.id,
          title: req.body.title,
          verified_by: req.body.verified_by,
          posted_by: req.body.posted_by,
          created_at: {
            gte: req.body?.date?.lower_bound,
            lte: req.body?.date?.upper_bound,
          },
          tags:
            req.body.tags && req.body.tags.length > 0
              ? { some: { name: { in: req.body.tags } } }
              : {},
        },
        include: {
          tags: {
            select: {
              name: true,
            },
          },
        },
      });
    else
      newBlog = await prisma.client.blog.findMany({
        where: {
          id: req.body.id,
          title: req.body.title,
          posted_by: req.body.posted_by,
          created_at: {
            gte: req.body?.date?.lower_bound,
            lte: req.body?.date?.upper_bound,
          },
          tags:
            req.body.tags && req.body.tags.length > 0
              ? { some: { name: { in: req.body.tags } } }
              : {},
        },
      });

    res
      .status(201)
      .json(new ApiResponse(true, "blog gotted successfully", newBlog));
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2022"
    ) {
      return res
        .status(400)
        .json(new ApiResponse(false, "not authorized to post blogs"));
    }

    res.status(400).json(new ApiResponse(false, "error while getting blog"));
  }
};
