import { Request, Response } from "express";
import prisma from "../../prisma/client/prismaClient";
import ApiResponse from "../../types/response";

const getTags = async (req: Request, res: Response) => {
  const tag_name = req.body.tag_name;
  try {
    const tags = await prisma.tag.findMany({
      where: {
        name: tag_name,
      },
    });

    return res
      .status(200)
      .json(new ApiResponse(true, "Tags getted successfully.", tags));
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(new ApiResponse(false, "Failed to get tags!", null, error));
  }
};

export default getTags;
