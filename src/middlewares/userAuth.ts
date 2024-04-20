import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import prisma from "../prisma/"
import ApiResponse from "../types/response";
// import ApiResponse from "../types/response";

declare global {
    namespace Express {
        interface Request {
            userAuth?: any;
        }
    }
}

export default async (req: Request, res: Response, next: NextFunction) => {
    // console.log('**user_auth: ', req)

    const token = req.headers.authorization;
    if (token) {
        try {
            jwt.verify(token, 'jwtsecretkey');
        } catch(error) {
            return res.status(401).json(new ApiResponse(false, "unauthorized user"));
        }

        req.userAuth = jwt.decode(token)
        next();
        return;
    }

    let user: any = req.user;

    try {

        const sessionId: string = req.sessionID;

        if (!sessionId)
        return res.redirect('/auth/google');

        user = await prisma.client.user.findFirst({
            where: {
                user_credential: {
                    credential_id: user.id
                }
            }
        })

    } catch(error) {
        console.error(error);
        return res.status(401).redirect('/auth/google');
    }

    res.setHeader('authorization', jwt.sign(user as Object, 'jwtsecretkey'));
    next();
    return;
} 
