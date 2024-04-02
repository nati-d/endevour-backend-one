import { Request, Response } from "express";
import jwt from "jsonwebtoken";

const tokenAuth = (req: Request, res: Response, next: any) => {
  const token = req.headers.authorization;
  if (!token)
    return res
      .status(401)
      .json({ success: false, message: "Access denied. Token not provided" });

  try {
    const decoded = jwt.verify(token, "jwtprivatekey");
    req.body.auth = decoded;
    next();
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ success: false, message: "Access denied. Invalid token" });
  }
};

export default tokenAuth;
