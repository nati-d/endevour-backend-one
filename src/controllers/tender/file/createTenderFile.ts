// createTenderFile.ts
import { Request, Response } from "express";
import ApiResponse from "../../../types/response";
import prisma from "../../../prisma/client/prismaClient";

const createTenderFile = async (req: Request, res: Response) => {
  try {
    const { file, tender_id } = req.body;

    const createdFile = await prisma.tender_files.create({
      data: {
        file,
        tender_id,
      },
    });

    return res.json(
      new ApiResponse(true, "Tender file created successfully", createdFile)
    );
  } catch (error) {
    console.error("Error creating tender file:", error);
    return res
      .status(500)
      .json(new ApiResponse(false, "Internal server error"));
  }
};

export default createTenderFile;
