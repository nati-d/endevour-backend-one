import { Request, Response } from 'express';
import prisma from '../../prisma/'
import jwt from 'jsonwebtoken';
import ApiResponse from '../../types/response';

export default async (req: Request, res: Response) => {
    console.log("sessions-: ", req)

    let user: any = req.user;
    try {
        user = await prisma.client.user.findFirst({
            where: {
                user_credential: {
                    credential_id: user.id,
                    provider: user.provider
                }
            }, 
            select: {
                id: true,
                first_name: true,
                last_name: true,
                profile_image: true,
                phone_number: true,
                location: true,
                verified_by: true,
                created_at: true,
            }
        })
    } catch(error) {
        console.error(error)

        res.status(500).json(new ApiResponse(false, 'error while fetching validating request'));
    }

    try {
        const token = jwt.sign(user as Object, 'jwtsecretkey');
        return res.header('authorization', token ).json(new ApiResponse(true, 'successful log in'));
    } catch(error) {
        console.error(error);
        return res.status(400).json(new ApiResponse(false, 'invalid token'))
    }

}
