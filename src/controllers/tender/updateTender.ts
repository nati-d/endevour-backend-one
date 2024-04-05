import { Request, Response } from "express";
import ApiResponse from "../../types/response";
import prisma from "../../prisma/client/prismaClient";

const updateTender = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    req.body.price = parseFloat(req.body.price);
    req.body.starting_bid = parseFloat(req.body.starting_bid);
    const updatedTender = await prisma.tender.update({
      where: { id: Number(id) },
      data: {
        title: req.body.title,
        overview: req.body.overview,
        body: req.body.body,
        price: req.body.price,
        starting_bid: 123,
        eligibility: true,
        status: req.body.status,
        category: req.body.category,
        opening_date: req.body.opening_date,
        closing_date: req.body.closing_date,
      },
    });

    return res.json(
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
