import { NextFunction, Request, Response } from "express";
import prisma from "../../prisma/client/prismaClient";
import ApiResponse from "../../types/response";

const sendEmailForRecommenders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { recommenders_id, job_id } = req.body;

    const updatedExclusiveJob = await prisma.exclusive_job.update({
      where: {
        id: job_id,
      },
      data: {
        user: {
          connect: recommenders_id,
        },
      },
    });

    const mapedIds = recommenders_id.map((user: { id: any }) => user.id);

    const recommendersEmail = await prisma.user.findMany({
      where: {
        id: {
          in: mapedIds,
        },
        is_recommender: true,
      },
      select: {
        email: true,
      },
    });

    const joinedEmails = recommendersEmail
      .map((recommender) => recommender.email)
      .join(", ");

    req.emailData = {
      sendTo: joinedEmails,
      subject: "Recommend user for the above job",
      html:
        updatedExclusiveJob.description +
        `<a href='https://endevour.org/exclusive-job/recommend?job_id=${updatedExclusiveJob.id}'>Recommend here</a>`,
      queryOnFail: async () =>
        await prisma.exclusive_job.update({
          where: {
            id: job_id,
          },
          data: {
            user: {
              disconnect: recommenders_id,
            },
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
          "Failed to send emailes for the given recommenders please try later!",
          null,
          error
        )
      );
  }
};

export default sendEmailForRecommenders;
