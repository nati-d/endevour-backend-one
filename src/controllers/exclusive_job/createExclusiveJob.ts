import { NextFunction, Request, Response } from "express";
import prisma from "../../prisma/client/prismaClient";
import ApiResponse from "../../types/response";
import recommendForJob from "../../templates/recommendForJob";

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
        closing_date,
        user: {
          connect: recommenders_id,
        },
        verified_by: verifiedBy,
      },
    });

    const recommenders = await prisma.exclusive_job.findUnique({
      where: { id: createdExclusiveJob.id },
      include: {
        user: true,
      },
    });

    const recommendersEmail = recommenders?.user
      .map((recommender) => recommender.email)
      .join(", ");

    req.emailData = {
      sendTo: recommendersEmail ? recommendersEmail : "",
      subject: "Recommend your best for the best.",
      html: recommendForJob(
        createdExclusiveJob.description,
        `https://www.endevour.org/jobs/recommend/${createdExclusiveJob.id}`
      ),
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
