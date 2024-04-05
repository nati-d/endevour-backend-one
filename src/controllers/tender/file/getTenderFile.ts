import { Request, Response } from "express";
import prisma from "../../../prisma/client/prismaClient";
import ApiResponse from "../../../types/response";
const deleteTenderFile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

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
