"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../../prisma/"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const response_1 = __importDefault(require("../../types/response"));
exports.default = async (req, res) => {
    console.log("sessions-: ", req);
    let user = req.user;
    try {
        user = await prisma_1.default.client.user.findFirst({
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
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json(new response_1.default(false, 'error while fetching validating request'));
    }
    try {
        const token = jsonwebtoken_1.default.sign(user, 'jwtsecretkey');
        return res.header('authorization', token).json(new response_1.default(true, 'successful log in'));
    }
    catch (error) {
        console.error(error);
        return res.status(400).json(new response_1.default(false, 'invalid token'));
    }
};
