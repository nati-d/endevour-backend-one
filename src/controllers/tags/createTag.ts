import { Request, Response } from "express";
import prisma from "../../prisma/client/prismaClient";
import ApiResponse from "../../types/response";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

const createTag = async (req: Request, res: Response) => {
  const { name } = req.body;
  const id = req.auth?.id;
  try {
    const createdTag = await prisma.tag.create({
      data: {
        name,
        verified_by: id,
      },
    });

    return res
      .status(201)
      .json(new ApiResponse(true, "Tag created successfully.", createdTag));
  } catch (error) {
    console.log(error);
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return res
          .status(400)
          .json(new ApiResponse(false, "Tag already exist!"));
      }
    }
    return res
      .status(500)
      .json(new ApiResponse(false, "Failed to create tag!", null, error));
  }
};

export default createTag;
