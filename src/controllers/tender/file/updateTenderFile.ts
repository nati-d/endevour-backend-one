// updateTenderFile.ts
import { Request, Response } from "express";
import prisma from "../../../prisma/client/prismaClient";
import ApiResponse from "../../../types/response";

const updateTenderFile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { file, tender_id } = req.body;

    const updatedFile = await prisma.tender_files.update({
      where: { id: Number(id) },
      data: {
        file,
        tender_id,
      },
    });

    return res.json(
      new ApiResponse(true, "Tender file updated successfully", updatedFile)
    );
  } catch (error) {
    console.error("Error updating tender file:", error);
    return res
      .status(500)
      .json(new ApiResponse(false, "Internal server error"));
  }
};

export default updateTenderFile;
