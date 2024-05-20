"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../../../../prisma/"));
const client_1 = require("@prisma/client");
const response_1 = __importDefault(require("../../../../types/response"));
exports.default = async (req, res, next) => {
    try {
        let saved = await prisma_1.default.client.procurement.upsert({
            where: {
                user_service_provider: {
                    user: req.auth.id,
                    service_provider: req.body.id
                }
            },
            update: {},
            create: {
                user: req.auth.id, service_provider: req.body.id
            },
            include: {
                user_: {
                    select: {
                        id: false,
                        username: true,
                        first_name: true,
                        last_name: true,
                        email: true,
                        phone_number: false,
                        password: false,
                        profile_image: false,
                        location: false,
                        verified_by: false,
                        token: false,
                        is_recommender: false,
                        created_at: false,
                        updated_at: false
                    }
                },
                service_provider_: {
                    select: {
                        id: false,
                        name: true,
                        phone: false,
                        email: true,
                        about: true,
                        verified_by: false,
                        service_category: true,
                        password: false,
                        created_at: false,
                        updated_at: false
                    }
                }
            }
        });
        req.emailData = {
            sendTo: req.auth?.email,
            subject: "subject",
            html: "html"
        };
        // res.status(201).json(new ApiResponse(true, "data saved successfully", saved));
        next();
    }
    catch (error) {
        console.error(error);
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            if (error.code == 'P2002')
                return res.status(409).json(new response_1.default(false, "content already saved"));
            if (error.code == 'P2003')
                return res.status(404).json(new response_1.default(false, "resource to be saved does not exist"));
        }
        return res.status(500).json(new response_1.default(false, "error while processing request"));
    }
};
