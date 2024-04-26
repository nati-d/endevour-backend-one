import { Request, Response } from 'express';
import prisma from '../../prisma/'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import ApiResponse from '../../types/response';

export default async (req: Request, res: Response) => {

    let user: any = req.user;
    try {
        if (user) {
            user = await prisma.client.user.findFirst({
                where: { user_credential: { credential_id: user.id, provider: user.provider } }
            })
        }

        else if (req.body) {
            user = await prisma.client.user.findFirst({
                where: { email: req.body.email }
            });

            if (!user)
            return res.status(400).json(new ApiResponse(false, "user not found"));

            if ( !bcrypt.compareSync(req.body.password, user.password) )
            return res.status(401).json(new ApiResponse(false, "incorrect email or password"));
        }
        else {
            return res.status(400).json(new ApiResponse(false, "unable to authenticate user"));
        }
    } catch(error) {
        console.error(error)

        return res.status(500).json(new ApiResponse(false, 'error while validating request'));
    }

    try {
        user.is_admin = false;
        delete user.password;
        const token = jwt.sign(user, 'jwtprivatekey');
        return res.header('authorization', token ).json(new ApiResponse(true, 'successful log in', token));
    } catch(error) {
        console.error(error);

        return res.status(400).json(new ApiResponse(false, 'invalid token'))
    }
}
