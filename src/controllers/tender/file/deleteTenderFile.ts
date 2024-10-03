import { Request, Response } from "express";
import ApiResponse from "../../../types/response";
import prisma from "../../../prisma/client/prismaClient";
import { v2 as cloudinary } from "cloudinary";

const deleteTenderFile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const existingFile = await prisma.tender_files.findUnique({
      where: { id: Number(id) },
    });

    if (!existingFile) {
      return res.status(404).json(new ApiResponse(false, "File not found"));
    }

    const publicId = existingFile.file.split('/').pop()?.split('.')[0]; 

    if (publicId) {
      try {
        await cloudinary.uploader.destroy(publicId);
      } catch (error) {
        console.error(`Failed to delete file from Cloudinary: ${existingFile.file}`, error);
      }
    }

    await prisma.tender_files.delete({
      where: { id: Number(id) },
    });

    return res.json(new ApiResponse(true, "Tender file deleted successfully"));
  } catch (error) {
    console.error("Error deleting tender file:", error);
    return res
      .status(500)
      .json(new ApiResponse(false, "Internal server error"));
  }
};

export default deleteTenderFile;
