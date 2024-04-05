import { Request, Response } from "express";
import ApiResponse from "../../types/response";
import prisma from "../../prisma/client/prismaClient";
import fs from "fs/promises";
import path from "path";
const deleteTender = async (req: Request, res: Response) => {
  try {
    const { tender_id } = req.query;
    const existingTender = await prisma.tender.findUnique({
      where: { id: Number(tender_id) },
      include: { files: true },
    });

    if (!existingTender) {
      return res.status(404).json(new ApiResponse(false, "Tender not found"));
    }

    const fileDeletePromises = existingTender.files.map(async (file) => {
      const filePath = path.join(
        __dirname,
        "../../../public/files/tender_files",
        file.file
      );
      await fs.unlink(filePath);
    });

    await Promise.all(fileDeletePromises);

    await prisma.tender.delete({
      where: { id: Number(tender_id) },
    });

    return res.json(new ApiResponse(true, "Tender deleted successfully"));
  } catch (error) {
    console.error("Error deleting tender:", error);
    return res
      .status(500)
      .json(new ApiResponse(false, "Internal server error"));
  }
};

export default deleteTender;
