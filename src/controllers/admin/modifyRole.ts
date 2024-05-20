import { Request, Response } from "express";
import ApiResponse from "../../types/response";
import prisma from "../../prisma/client/prismaClient";
import _ from "lodash";
import jwt from "jsonwebtoken";

const modifyRole = async (req: Request, res: Response) => {
  try {
    const { role } = req.body;

    if (role != "ADMIN" && role != "SUPER_ADMIN")
      return res
        .status(400)
        .json(
          new ApiResponse(false, "Invalide role please select valide role")
        );

    const updateAdminRole = await prisma.admin.update({
      data: {
        role,
      },
      where: {
        id: parseInt(req.auth.id),
      },
    });

    if (!updateAdminRole)
      return res
        .status(404)
        .json(new ApiResponse(false, "Can't find admin with specifide id."));

    const payload = _.pickBy(
      updateAdminRole,
      (_value, key) => key != "password"
    );
    const token = jwt.sign(payload, process.env.JWT_KEY || "");

    return res.status(200).json(
      new ApiResponse(true, "Admin role updated successfully!", {
        token,
      })
    );
  } catch (error) {}
};
export default modifyRole;
