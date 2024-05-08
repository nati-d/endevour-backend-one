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

  if (!token) {
    next();
  }
  else {

    try {
      const decoded: any = jwt.verify(token, process.env.JWT_KEY as string);
      if (decoded.is_admin == true) req.auth = decoded;
      next();
    } catch (error) {

      return res
        .status(400)
        .json(new ApiResponse(false, "Access denied. Invalid token"));
    }

  }
};

export default tokenAuth;
