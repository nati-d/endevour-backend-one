import prisma from "../../prisma/index";
import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import Validator from "../../validation/index";
import { Job_post } from "../../types/types";

export default async (req: Request, res: Response) => {
  try {
    const { error } = Validator.job.jobPost.validate(req.body);

    if (error) {
      return res.send({
        success: false,
        message: error.details,
        data: null,
      });
    }
  } catch (error) {
    console.error(error);

    return res.status(400).send({
      status: false,
      message: "Error at request validation",
      description: error,
    });
  }

  let jobId: number = 0;

  try {
    if (req.body.auth.role == "ADMIN" || req.body.auth.role == "SUPER_ADMIN") {
      const newJobPost = await prisma.client.job_post.create({
        data: {
          title: req.body.title,
          overview: req.body.overview,
          body: req.body.body,
          contract_type: req.body.contract_type,
          year_of_experience: req.body.year_of_experience,
          thumbnail: req.body.thumbnail,
          category: req.body.category,
          closing_date: new Date(req.body.closing_date),
          verified_at: new Date(),
          verified_by: req.body.auth.id,
        },
      });

      jobId = newJobPost.id;

      await prisma.client.salary.create({
        data: {
          id: newJobPost.id,
          low_end: req.body.low_end,
          high_end: req.body.high_end,
          periodicity: req.body.periodicity,
          currency: req.body.currency,
        },
      });

      res.send(newJobPost);
    }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if ((error.code = "P2022")) {
        return res.status(400).json({
          status: false,
          message: "Not authorized to post jobs",
          error: error,
        });
      }
    }

        try {
            await prisma.client.job_post.delete({
                where: {
                    id: jobId
                }
            })
        } catch (error) {
            console.log(error)
        }

        return res.status(400).json({
            status: false,
            message: "error while creating job post"
        })
    }
}
