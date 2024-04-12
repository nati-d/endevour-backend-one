import { Request, Response } from "express";
import prisma from "../../prisma/client/prismaClient";
import ApiResponse from "../../types/response";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

const updateTag = async (req: Request, res: Response) => {
  const { new_tag, old_tag } = req.body;
  try {
    const updatedTag = await prisma.tag.update({
      data: {
        name: new_tag,
      },
      where: {
        name: old_tag,
      },
    });

    return res
      .status(200)
      .json(new ApiResponse(true, "Tag updated successfully.", updatedTag));
  } catch (error) {
    console.log(error);
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return res
          .status(400)
          .json(new ApiResponse(false, "Tag already exist!"));
      }
      if (error.code === "P2025")
        return res
          .status(400)
          .json(
            new ApiResponse(
              false,
              "Invalide old tag name. Old tag name does not exist."
            )
          );
    }
    return res
      .status(500)
      .json(new ApiResponse(false, "Failed to update tag!", null, error));
  }
};

export default updateTag;
