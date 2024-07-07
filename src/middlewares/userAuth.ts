import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import prisma from "../prisma";
import ApiResponse from "../types/response";
import { redisClient } from '../configs/cookie';
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

    let user: any = req.user;

    try {
        let cached_ = ( await redisClient.get(`endevour:${req.sessionID}`) )
        let cached = JSON.parse(cached_ as string);
        console.log('**cached: ', cached)

        const sessionId: string = req.sessionID;

        if (!sessionId) {
            return res.redirect('/auth/google');
        }

        user = await prisma.client.user.findFirst({
            where: {
                email: user?.email
            }
        });

        if (!user) {
            return res.status(401).redirect('/auth/google');
        }
    } catch (error) {
        console.error(error);
        return res.status(401).redirect('/auth/google');
    }

    const newToken = jwt.sign(user, process.env.JWT_KEY as string);

    res.setHeader('authorization', newToken);

    res.setHeader(
        'Set-Cookie',
        cookie.serialize('XSRF-TOKEN', "loggeg_in", {
            sameSite: 'lax',
            httpOnly: process.env.ENV !== 'development',
            path: '/',
            secure: process.env.ENV !== 'development',
            maxAge: 60 * 60 * 24 * 7 * 52,
            domain: process.env.COOKIE_DOMAIN as string,
        })
    );

    req.userAuth = user;
    next();
};

export default authMiddleware;
