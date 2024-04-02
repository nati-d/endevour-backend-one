import { Request, Response } from "express";
import { login } from "../../validation/admin";
import prisma from "../../prisma/client/prismaClient";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import _ from "lodash";
const adminLogin = async (req: Request, res: Response) => {
  const { error } = login.validate(req.body);
  if (error)
    return res.status(400).json({ success: false, message: error.message });
  try {
    const getAdmin = await prisma.admin.findUnique({
      where: {
        email: req.body.email,
      },
    });

    if (!getAdmin)
      return res
        .status(400)
        .json({ success: false, message: "Invalide credential." });

    const decodedPassword = await bcrypt.compare(
      req.body.password,
      getAdmin.password
    );

    if (!decodedPassword) {
      return res.status(400).json({
        success: false,
        message: "Invalide credentail",
      });
    } else {
      const payload = _.pickBy(getAdmin, (_value, key) => key !== "password");
      const token = jwt.sign(payload, "jwtprivatekey");
      return res
        .status(200)
        .json({ success: true, message: "Logged in successfully.", token });
    }
  } catch (error) {
    console.log(error);
    return res.status(501).json({ success: false, message: error });
  }
};

export default adminLogin;
