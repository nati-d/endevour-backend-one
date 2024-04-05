// getTenderFiles.ts
import { Request, Response } from "express";
import prisma from "../../../prisma/client/prismaClient";
import ApiResponse from "../../../types/response";

const getTenderFiles = async (req: Request, res: Response) => {
  try {
    const files = await prisma.tender_files.findMany();

    return res.json(
      new ApiResponse(true, "Tender files fetched successfully", files)
    );
  } catch (error) {
    console.error("Error fetching tender files:", error);
    return res
      .status(500)
      .json(new ApiResponse(false, "Internal server error"));
  }
};

export default getTenderFiles;
