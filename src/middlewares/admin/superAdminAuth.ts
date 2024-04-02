import { Request, Response } from "express";

const superAdminAuth = async (req: Request, res: Response, next: any) => {
  if (req.body?.auth?.role !== "SUPER_ADMIN")
    return res
      .status(403)
      .json({ success: false, message: "Access denied. lack super admin." });

  next();
};

export default superAdminAuth;
