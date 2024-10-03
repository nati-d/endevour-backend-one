import { NextFunction, Request, Response } from "express";
import prisma from "../../prisma/client/prismaClient";
import ApiResponse from "../../types/response";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

const createTender = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
    if (!files.length) {
      return res.status(400).json(new ApiResponse(false, "No files uploaded."));
    }


    try {
      const parsedTags = JSON.parse(tags);
      const parsedNewTags = JSON.parse(new_tags);
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
              data: files.map((file: any) => ({
                file: file.path,
              })),
            },
          },
          tags: {
            connect: parsedTags,
            create: parsedNewTags,
          },
        },
      });

      const getSubscribedUsers = await prisma.personalized_alerts.findMany({
        where: {
          alert_for: "tender",
        },
        include: {
          user: {
            select: {
              email: true,
            },
          },
        },
      });
      const userEmails = getSubscribedUsers.map((alert) => alert.user.email);
      console.log(userEmails);
      req.emailData = {
        html: "Personalized alert notification",
        sendTo: userEmails,
        subject: "New tender for you",
        resMessage: "Tender created successfully",
        otherData: createdTender,
        statusCode: 201,
      };

      next();
    } catch (parseError) {
      console.error("Error parsing tags:", parseError);
      return res
        .status(400)
        .json(new ApiResponse(false, "Invalid tags format."));
    }
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
