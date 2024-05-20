import { Request, Response } from "express";
import Joi from "joi";
import ApiResponse from "../../types/response";
import prisma from "../../prisma/client/prismaClient";
import bcrypt from "bcrypt";
import hashPassword from "../../helpers/hashPassword";

const PasswordValidation = Joi.object({
  old_password: Joi.string().min(6).max(32).required(),
  new_password: Joi.string().min(6).max(32).required(),
  confirm_password: Joi.string().min(6).max(32).required(),
});

const changePassword = async (req: Request, res: Response) => {
  try {
    const { error } = PasswordValidation.validate(req.body);
    if (error)
      return res.status(400).json(new ApiResponse(false, error.message));

    const { old_password, new_password, confirm_password } = req.body;

    if (new_password !== confirm_password)
      return res
        .status(400)
        .json(
          new ApiResponse(
            false,
            "New password and confirm password does't mutch."
          )
        );

    const getAdmin = await prisma.admin.findFirst({
      where: {
        id: parseInt(req.auth.id),
      },
    });

    if (!getAdmin)
      return res.status(404).json(new ApiResponse(false, "Can't find admin!"));

    const passwordAuth = await bcrypt.compare(old_password, getAdmin.password);

    if (!passwordAuth)
      return res
        .status(400)
        .json(new ApiResponse(false, "Invalide  password!"));
    const hashedPassword = await hashPassword(new_password);

    const updatePassword = await prisma.admin.update({
      data: {
        password: hashedPassword,
      },
      where: {
        id: parseInt(req.auth.id),
      },
    });

    if (!updatePassword)
      return res.status(404).json(new ApiResponse(false, "Can't find admin!"));

    return res
      .status(200)
      .json(new ApiResponse(true, "Password updated successfully."));
  } catch (error) {}
};

export default changePassword;
