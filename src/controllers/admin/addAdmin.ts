import { Request, Response } from "express";
import prisma from "../../prisma/client/prisamClient";
import { Admin } from "../../types/types";
import bcrypt from "bcrypt";
import { newAdmin } from "../../validation/admin";

const addAdmin = async (req: Request, res: Response) => {
  const body = req.body as Admin;
  const { error } = newAdmin.validate(req.body);
  if (error)
    return res.status(400).json({ success: false, message: error.message });
  try {
    const getAdmin = await prisma.admin.findUnique({
      where: {
        email: body.email,
      },
    });

    if (getAdmin) {
      return res.status(400).json({
        success: false,
        message: "Admin already exist with this email.",
        data: null,
      });
    } else {
      const salt = await bcrypt.genSalt(13);
      const hashedPassword = await bcrypt.hash(body.password, salt);
      await prisma.admin.create({
        data: {
          first_name: body.first_name,
          last_name: body.last_name,
          passWord: hashedPassword,
          email: body.email,
          phone_number: body.phone_number,
          role: body.role,
        },
      });
      return res.status(201).json({
        success: true,
        message: "Admin added successfully",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(501).json({
      success: false,
      message: error,
    });
  }
};

export default addAdmin;
