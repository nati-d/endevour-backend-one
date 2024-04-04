import { Request, Response } from "express";
import prisma from "../../prisma/client/prismaClient";
import _ from "lodash";
import ApiResponse from "../../types/response";
import { Admin_role } from "../../types/types";
import { adminRole } from "../../validation/admin";
const getAdmins = async (req: Request, res: Response) => {
  const { error } = adminRole.validate(req.query);
  if (error)
    return res.status(400).json(new ApiResponse(false, "Invalide role query"));

  const role = req.query.role as Admin_role;
  try {
    const getAdmins = await prisma.admin.findMany({
      where: {
        role,
      },
    });
    const passwordRemoved = getAdmins.map((element) =>
      _.pickBy(element, (value, key) => key !== "password")
    );
    return res
      .status(200)
      .json(
        new ApiResponse(true, "Admins retrieved successfully.", passwordRemoved)
      );
  } catch (error) {
    return res
      .status(500)
      .json(
        new ApiResponse(
          false,
          "Error while retrieving admins. please try again!"
        )
      );
  }
};
export default getAdmins;
