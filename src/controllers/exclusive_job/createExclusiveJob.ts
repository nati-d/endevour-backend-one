import { Request, Response } from "express";
import prisma from "../../prisma/client/prismaClient";
import ApiResponse from "../../types/response";
import sendEmail, { Attachment } from "../../services/notifications/sendEmail";
import { Exclusive_job } from "../../types/types";

const createExclusiveJob = async (req: Request, res: Response) => {
  if (!req.auth) return;

  const { title, overview, recommenders_id, closing_date } = req.body;
  const file = req.file?.filename;
  const verifiedBy = req.auth?.id;
  let createdExclusiveJob: Exclusive_job;
  if (!file)
    return res.status(400).json(new ApiResponse(false, "File not provided."));

  try {
    createdExclusiveJob = await prisma.exclusive_job.create({
      data: {
        title,
        overview,
        file,
        verified_by: verifiedBy,
        closing_date,
        recommenders: {
          connect: JSON.parse(recommenders_id),
        },
      },
    });
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

  const htmlTemplate = () => `
  <html>
    <head>
      <title>Endevour Exclusive Job</title>
    </head>
    <body>
      <h1>${title}</h1>
      <p>${overview}</p>
      <a href = https://endevour.org/exclusive-jobs/recommend/${createdExclusiveJob.id}>Recommend here</>
    </body>
  </html>
`;

  const attachment_file: Attachment = {
    filename: "detail.pdf",
    path: `https://api.endevour.org/public/files/exclusive_job/${file}`,
  };

  try {
    const recommenders = await prisma.exclusive_job.findUnique({
      where: { id: createdExclusiveJob.id },
      include: {
        recommenders: true,
      },
    });
    const recommendersEmail = recommenders?.recommenders
      .map((recommender) => recommender.email)
      .join(", ");

    await sendEmail(
      recommendersEmail ? recommendersEmail : "",
      "Recommend your best for the best.",
      htmlTemplate(),
      [attachment_file]
    );

    return res
      .status(201)
      .json(
        new ApiResponse(
          true,
          "Emails send successfully to the recommenders.",
          createdExclusiveJob
        )
      );
  } catch (error) {
    console.log(error);
    await prisma.exclusive_job.delete({
      where: {
        id: createdExclusiveJob.id,
      },
    });

    return res
      .status(500)
      .json(
        new ApiResponse(
          false,
          "Failed to send email for recommenders please try again!"
        )
      );
  }
};

export default createExclusiveJob;
