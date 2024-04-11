import { Request, Response } from "express";
import ApiResponse from "../../types/response";
import prisma from "../../prisma/client/prismaClient";
import { Tender } from "../../types/types";

const updateTender = async (req: Request, res: Response) => {
  try {
    const body = req.body as Tender;
    const { tender_id } = req.query;
    console.log(tender_id);
    const updatedTender = await prisma.tender.update({
      where: { id: Number(tender_id) },
      data: {
        title: body.title,
        overview: body.overview,
        body: body.body,
        price: body.price,
        starting_bid: body.starting_bid,
        eligibility: true,
        status: body.status,
        category: body.category,
        opening_date: body.opening_date,
        closing_date: body.closing_date,
      },
    });

    return res.status(200).json(
      new ApiResponse(true, "Tender updated successfully", updatedTender)
    );
  } catch (error) {
    console.error("Error updating tender:", error);
    return res
      .status(500)
      .json(new ApiResponse(false, "Internal server error"));
  }
};

export default updateTender;
