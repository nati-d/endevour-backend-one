import { Request, Response } from "express";
import prisma from "../../prisma/client/prismaClient";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import ApiResponse from "../../types/response";

const deleteTag = async (req: Request, res: Response) => {
  const { tag_name } = req.params;
  console.log(tag_name);
  try {
    await prisma.tag.delete({
      where: {
        name: tag_name,
      },
    });
    return res.status(204).end();
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
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
      .json(new ApiResponse(false, "Failed to delete tag!", null, error));
  }
};

export default deleteTag;
