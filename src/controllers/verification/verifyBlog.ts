import { NextFunction, Request, Response } from "express";
import prisma from "../../prisma/client/prismaClient";
import ApiResponse from "../../types/response";

const verifyBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { blog_id } = req.params;
    const admin_id = req.auth.id;

    const selectBlog = await prisma.blog.findFirst({
      where: {
        id: parseInt(blog_id),
        posted_by: { not: null },
        verified_by: null,
      },
    });

    if (!selectBlog)
      return res
        .status(400)
        .json(
          new ApiResponse(
            false,
            "Invalid data. Can't find blog post with the provided data!"
          )
        );

    const verifiedBlog = await prisma.blog.update({
      where: {
        id: parseInt(blog_id),
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

    if (!verifiedBlog.user?.email) return;

    req.emailData = {
      sendTo: verifiedBlog.user?.email,
      subject: "blog post verification",
      html: "<p> Congratulations your blog post is verified.",
      otherData: verifiedBlog,
      resMessage: "blog verified successfully.",
      statusCode: 201,
      queryOnFail: async () =>
        await prisma.blog.update({
          where: {
            id: parseInt(blog_id),
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
      .json(new ApiResponse(false, "Failed to verify blog post", null, error));
  }
};

export default verifyBlog;
