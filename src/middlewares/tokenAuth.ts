import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import ApiResponse from "../types/response";

declare global {
  namespace Express {
    interface Request {
      auth?: any;
    }
  }
}

const tokenAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token)
    return res
      .status(401)
      .json(new ApiResponse(false, "Access denied. Token not provided"));

  try {
    const decoded = jwt.verify(token, "jwtprivatekey");
    req.auth = decoded;
    next();
  } catch (error) {
    return res
      .status(400)
      .json(new ApiResponse(false, "Access denied. Invalid token"));
  }
};

export default tokenAuth;
