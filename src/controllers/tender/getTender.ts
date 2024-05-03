import { Request, Response } from "express";
import prisma from "../../prisma/client/prismaClient";
import ApiResponse from "../../types/response";

const getTender = async (req: Request, res: Response) => {
  const { tender_id } = req.params;

  try {
    const tender = await prisma.tender.findUnique({
      where: {
        id: parseInt(tender_id),
      },
      include: {
        files: true,
        tender_category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!tender)
      return res
        .status(404)
        .json(
          new ApiResponse(false, "We can't find tender with the given id.")
        );

    return res
      .status(200)
      .json(new ApiResponse(true, "Tender getted successfully.", tender));
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(
        new ApiResponse(false, "Something went wrong while getting tender.")
      );
  }
};
export default getTender;
