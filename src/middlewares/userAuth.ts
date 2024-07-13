import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import prisma from "../prisma";
import ApiResponse from "../types/response";
import cookie from 'cookie';

declare global {
    namespace Express {
        interface Request {
            userAuth?: any;
        }
    }
}

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (token) {
        try {
            const decodedToken = jwt.verify(token, process.env.JWT_KEY as string);
            req.userAuth = decodedToken;
            next();
            return;
        } catch (error) {
            return res.status(401).json(new ApiResponse(false, "unauthorized user"));
        }
    }
};

export default authMiddleware;
