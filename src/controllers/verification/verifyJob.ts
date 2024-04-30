import { NextFunction, Request, Response } from "express";
import prisma from "../../prisma/client/prismaClient";
import ApiResponse from "../../types/response";

const verifyJob = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { job_id } = req.params;
    const admin_id = req.auth.id;

    const selectJob = await prisma.job_post.findFirst({
      where: {
        id: parseInt(job_id),
        posted_by: { not: null },
        verified_by: null,
      },
    });

    if (!selectJob)
      return res
        .status(400)
        .json(
          new ApiResponse(
            false,
            "Invalid data. Can't find job post with the provided data!"
          )
        );

    const verifiedJob = await prisma.job_post.update({
      where: {
        id: parseInt(job_id),
      },
      data: {
        verified_by: admin_id,
      },
      include: {
        user: {
          select: {
            email: true,
          },
        },
      },
    });

    if (!verifiedJob.user?.email) return;

    req.emailData = {
      sendTo: verifiedJob.user?.email,
      subject: "Job post verification",
      html: "<p> Congratulations your job post is verified.",
      otherData: verifiedJob,
      resMessage: "Job verified successfully.",
      statusCode: 201,
      queryOnFail: async () =>
        await prisma.job_post.update({
          where: {
            id: parseInt(job_id),
          },
          data: {
            verified_by: null,
          },
        }),
    };

    next();
  } catch (error) {
    return res
      .status(500)
      .json(new ApiResponse(false, "Failed to verify job post", null, error));
  }
};

export default verifyJob;
