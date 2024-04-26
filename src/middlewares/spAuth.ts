import { Request, Response, NextFunction } from "express";
import ApiResponse from "../types/response";

export default async (req: Request, res: Response, next: NextFunction) => {
    if (req.auth.is_service_provider) {
        next();
    } else {
        res.status(401).json(new ApiResponse(false, "Access denied. lack service provider" ));
    }
}
