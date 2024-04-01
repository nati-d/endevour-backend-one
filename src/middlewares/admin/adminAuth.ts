import { Request, Response } from "express";

const adminAuth = async (req: Request, res: Response, next: any) => {
  if (!req.body?.auth?.adminRole)
    return res
      .status(403)
      .json({ success: false, message: "Access denied. lack admin" });
};

export default adminAuth;
