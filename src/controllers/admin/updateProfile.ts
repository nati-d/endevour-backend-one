import { Request, Response } from "express";
import prisma from "../../prisma/client/prismaClient";
import ApiResponse from "../../types/response";
import _ from "lodash";
import jwt from "jsonwebtoken";
const updateProfile = async (req: Request, res: Response) => {
  try {
    const { first_name, last_name, phone_number, email } = req.body;
    const updatedAdmin = await prisma.admin.update({
      where: {
        id: parseInt(req.auth.id),
      },
      data: {
        first_name,
        last_name,
        phone_number,
        email,
      },
    });

    if (!updatedAdmin)
      return res
        .status(400)
        .json(new ApiResponse(false, "Invalide credential."));

    const payload = _.pickBy(updatedAdmin, (_value, key) => key != "password");
    const token = jwt.sign(payload, process.env.JWT_KEY || "");

    return res.status(200).json(
      new ApiResponse(true, "Admin updated successfully.", {
        token,
      })
    );
  } catch (error) {}
};

export default updateProfile;
