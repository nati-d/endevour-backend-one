"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const response_1 = __importDefault(require("../types/response"));
exports.default = async (req, res, next) => {
    // console.log('**user_auth: ', req)
    const token = req.headers.authorization;
    if (token) {
        try {
            jsonwebtoken_1.default.verify(token, 'jwtsecretkey');
        }
        catch (error) {
            return res.status(401).json(new response_1.default(false, "unauthorized user"));
        }
        req.userAuth = jsonwebtoken_1.default.decode(token);
        next();
        return;
    }
    // let user: any = req.user;
    // try {
    //     const sessionId: string = req.sessionID;
    //     if (!sessionId)
    //     return res.redirect('/auth/google');
    //     user = await prisma.client.user.findFirst({
    //         where: {
    //             user_credential: {
    //                 credential_id: user.id
    //             }
    //         }
    //     })
    // } catch(error) {
    //     console.error(error);
    // return res.status(401).redirect('/auth/google');
    // }
    // res.setHeader('authorization', jwt.sign(user as Object, 'jwtsecretkey'));
    // next();
    // return;
};
