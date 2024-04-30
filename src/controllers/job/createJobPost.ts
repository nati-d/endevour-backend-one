import prisma from "../../prisma/index";
import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import _ from "lodash";
import Validator from "../../validation/index";
import ApiResponse from "../../types/response";

export default async (req: Request, res: Response) => {
  try {
    const { error } = Validator.job.jobPost.validate(req.body);

    if (error) {
      return res
        .status(400)
        .send(
          new ApiResponse(false, "unidentified request content", error.details)
        );
    }
  } catch (error) {
    return res
      .status(400)
      .send(new ApiResponse(false, "Error at request validation", error));
  }

  let jobId: number = 0;

  try {
    const newJobPost = await prisma.client.job_post.create({
      data: {
        title: req.body.title,
        overview: req.body.overview,
        body: req.body.body,
        contract_type: req.body.contract_type,
        year_of_experience: parseInt(req.body.year_of_experience),
        category: parseInt(req.body.category),
        closing_date: new Date(req.body.closing_date),
        verified_at: new Date(),
        verified_by: req.auth.is_admin == true ? req.auth?.id : null,
        posted_by: req.auth.is_admin == false ? req.auth?.id : null,
        tags: {
          connectOrCreate: req.body.tags.map((name: string) => ({
            where: { name },
            create: { name },
          })),
        },
      },
      include: { tags: { select: { name: true } } },
    });

    jobId = newJobPost.id;

    const salary = await prisma.client.salary.create({
      data: {
        id: newJobPost.id,
        low_end: parseInt(req.body.low_end),
        high_end: parseInt(req.body.high_end),
        periodicity: req.body.periodicity,
        currency: req.body.currency,
      },
    });

    res
      .status(201)
      .json(
        new ApiResponse(
          true,
          "job posted successfully",
          _.merge(newJobPost, salary)
        )
      );
  } catch (error) {
    console.log(error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if ((error.code = "P2022")) {
        return res
          .status(400)
          .json(new ApiResponse(false, "Invalid job category id.", error));
      }
    }

    try {
      if (jobId != 0)
        await prisma.client.job_post.delete({
          where: {
            id: jobId,
          },
        });
    } catch (error) {
      console.log(error);
    }

    return res
      .status(400)
      .json(new ApiResponse(false, "error while creating job post", error));
  }
};
