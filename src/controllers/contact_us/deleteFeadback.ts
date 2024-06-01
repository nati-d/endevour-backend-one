import { Request, Response } from "express";
import prisma from "../../prisma/client/prismaClient";

const deleteFeadback = async (req: Request, res: Response) => {
  try {
    const { feadback_id } = req.params;
    await prisma.customer_feadbacks.delete({
      where: {
        id: parseInt(feadback_id),
      },
    });

    return res.status(204).send();
  } catch (error) {
    console.log(error);
    return res.status(204).send();
  }
};

export default deleteFeadback;
