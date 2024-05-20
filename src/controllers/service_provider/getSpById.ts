import prisma from "../../prisma/index";
import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import _, { parseInt } from "lodash";
import ApiResponse from "../../types/response";

export default async (req: Request, res: Response) => {
  try {
    let id = parseInt(req.query.id as string) || req.body.id;

    let sp: any;

    sp = await prisma.client.service_provider.findFirst({
      where : { id },
      select: {
        id: true,
        name: true,
        phone: true,
        email: true,
        about: true,
        verified_by: true,
        service_category: true,
        created_at: true,
        updated_at: true
      }
    });

    if (sp)
    return res.status(200).json(new ApiResponse(true, "service provider fetched successfully", sp))
    else
    return res.status(204).json(new ApiResponse(false, "service provider does not exit", sp))
  } catch (error) {
    console.error(error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2022")
      return res.status(403).json(new ApiResponse(false, "not authorized to get service provider"))
    }

    return res.status(400).json(new ApiResponse(false, "error while getting service provider"));
  }

}
