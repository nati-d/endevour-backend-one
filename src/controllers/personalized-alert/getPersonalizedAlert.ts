import { Request, Response } from "express";
import prisma from "../../prisma/client/prismaClient";
import ApiResponse from "../../types/response";

const getPersonalizedAlert = async (req: Request, res: Response) => {
  try {
    const { alert_for } = req.query;
    const userId = req.auth.id;
    const getAlerts = await prisma.personalized_alerts.findMany({
      where: {
        user_id: userId,
        alert_for: alert_for?.toString(),
      },
    });
    return res
      .status(200)
      .json(
        new ApiResponse(
          true,
          "Pesonalized alert getted successfully.",
          getAlerts
        )
      );
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(
        new ApiResponse(false, "Failed to get personalized alerts", null, error)
      );
  }
};

export default getPersonalizedAlert;
