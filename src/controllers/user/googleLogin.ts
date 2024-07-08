import { Request, Response } from 'express';
import prisma from '../../prisma/'
import jwt from 'jsonwebtoken';
import { getDbConnection } from '../../configs/sqlite';
import ApiResponse from '../../types/response';

export default async (req: Request, res: Response) => {

    let user: any = req.user;
    try {
        user = await prisma.client.user.findFirst({
            where: {
                email: user.email
            }, 
            select: {
                id: true,
                username: true,
                first_name: true,
                last_name: true,
                profile_image: true,
                created_at: true,
            }
        })
    } catch(error) {
        console.error(error);

        res.status(500).json(new ApiResponse(false, 'error while processing request'));
    }

    try {
        const token = jwt.sign(JSON.stringify(user), process.env.JWT_KEY as string);
        res.setHeader('authorization', token);
        res.redirect(process.env.FINAL_REDIRECT as string);
    } catch(error) {
        console.error(error);
        return res.status(400).json(new ApiResponse(false, 'invalid token'));
    }

}
