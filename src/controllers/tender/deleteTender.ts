import { Request, Response } from "express";
import ApiResponse from "../../types/response";
import prisma from "../../prisma/client/prismaClient";
import { v2 as cloudinary } from "cloudinary";

const deleteTender = async (req: Request, res: Response) => {
  try {
    const { tender_id } = req.params;

    const existingTender = await prisma.tender.findUnique({
      where: { id: parseInt(tender_id) },
      include: { files: true },
    });

    if (!existingTender) {
      return res.status(404).json(new ApiResponse(false, "Tender not found"));
    }

    if (existingTender.files && existingTender.files.length > 0) {
      const fileDeletePromises = existingTender.files.map(async (file) => {
        try {
          const publicId = file.file.split('/').pop()?.split('.')[0]; 
          if (publicId) {
            await cloudinary.uploader.destroy(publicId);
          }
        } catch (error) {
          console.error(`Failed to delete file from Cloudinary: ${file.file}`, error);
        }
      });

      await Promise.all(fileDeletePromises);
    }

    await prisma.tender.delete({
      where: { id: Number(tender_id) },
    });

    return res.status(204).end();
  } catch (error) {
    console.error("Error deleting tender:", error);
    return res
      .status(500)
      .json(new ApiResponse(false, "Internal server error"));
  }
};

export default deleteTender;
