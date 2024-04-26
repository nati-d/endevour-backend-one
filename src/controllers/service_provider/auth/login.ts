import { Request, Response } from "express";
import prisma from "../../../prisma"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ApiResponse from "../../../types/response";

export default async (req: Request, res: Response) => {
    let user: any;
    try {
        user = await prisma.client.service_provider.findFirst( { where: { email: req.body.email } } );
        console.log(user)

        if (!user)
        return res.status(400).json(new ApiResponse(false, "username or password does not exist"));

    } catch(error: any) {
        console.log(error);

        return res.status(500).json(new ApiResponse(false, "error while authenticating user"));
    }

    try {
        if(!bcrypt.compareSync(req.body.password, user.password))
        return res.status(401).json(new ApiResponse(false, "username or password does not exist"));
    } catch(error) {
        console.log(error);

        return res.status(500).json(new ApiResponse(false, "error while authenticating user"));
    }

    try {
        delete user.password;
        user.is_service_provider = true;
        let token = jwt.sign(user, process.env.JWT_KEY as string);
        return res.status(200).header('authorization', token).json(new ApiResponse(true, "you have successfully logged in", token));
    } catch(error) {
        console.log(error);

        return res.status(500).json(new ApiResponse(false, "error while authenticating user"));
    }
}
