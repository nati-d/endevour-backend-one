import { Request, Response } from "express";
import prisma from "../../prisma/client/prismaClient";
import ApiResponse from "../../types/response";

const uploadProfileImage = async (req: Request, res: Response) => {
  const id = parseInt(req.body.id);
  const img = req.file?.filename;
  try {
    await prisma.admin.update({
      where: {
        id: id,
      },
      data: {
        profile_image: img,
      },
    });

    return res
      .status(201)
      .json(new ApiResponse(true, "Profile image uploaded successfully"));
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(
        new ApiResponse(
          false,
          "Error while uploading profile image please try again"
        )
      );
  }
};

export default uploadProfileImage;
