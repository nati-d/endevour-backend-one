import { NextFunction, Request, Response } from "express";
import prisma from "../../prisma/client/prismaClient";
import ApiResponse from "../../types/response";

const createExclusiveJob = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.auth) return;

  const { description, recommenders_id, closing_date } = req.body;
  const verifiedBy = req.auth?.id;

  try {
    const createdExclusiveJob = await prisma.exclusive_job.create({
      data: {
        description,
        verified_by: verifiedBy,
        closing_date,
        recommenders: {
          connect: recommenders_id,
        },
      },
    });

    const recommenders = await prisma.exclusive_job.findUnique({
      where: { id: createdExclusiveJob.id },
      include: {
        recommenders: true,
      },
    });

    const recommendersEmail = recommenders?.recommenders
      .map((recommender) => recommender.email)
      .join(", ");

    req.emailData = {
      sendTo: recommendersEmail ? recommendersEmail : "",
      subject: "Recommend your best for the best.",
      html:
        createdExclusiveJob.description +
        `<a href='https://endevour.org/exclusive-job/recommend?job_id=${createdExclusiveJob.id}'></a>`,
      otherData: createdExclusiveJob,
      queryOnFail: async () =>
        await prisma.exclusive_job.delete({
          where: {
            id: createdExclusiveJob.id,
          },
        }),
    };

    next();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(
        new ApiResponse(
          false,
          "Failed to create exclusive job please try again."
        )
      );
  }
};

export default createExclusiveJob;
