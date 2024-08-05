"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../../../../prisma/"));
const client_1 = require("@prisma/client");
const response_1 = __importDefault(require("../../../../types/response"));
const sendEmailConfig_1 = __importDefault(require("../../../../configs/sendEmailConfig"));
const serviceProviderContactRequest_1 = __importDefault(require("../../../../templates/serviceProviderContactRequest"));
exports.default = async (req, res, next) => {
    try {
        let saved = await prisma_1.default.client.procurement.upsert({
            where: {
                user_service_provider: {
                    user: req.auth.id,
                    service_provider: req.body.id,
                },
            },
            update: {},
            create: {
                user: req.auth.id,
                service_provider: req.body.id,
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
                        updated_at: false,
                    },
                },
                service_provider_: {
                    select: {
                        id: false,
                        name: true,
                        phone: true,
                        email: true,
                        about: true,
                        company: true,
                        website: true,
                        address: true,
                        verified_by: false,
                        service_category: true,
                        password: false,
                        created_at: false,
                        updated_at: false,
                    },
                },
            },
        });
        const template = (0, serviceProviderContactRequest_1.default)(saved.service_provider_.name, saved.service_provider_.phone, saved.service_provider_.email, saved.service_provider_.about, saved.service_provider_.company, saved.service_provider_.website, saved.service_provider_.address);
        await (0, sendEmailConfig_1.default)(req.auth?.email, "Service Provider Contact Informations", template);
        res
            .status(201)
            .json(new response_1.default(true, "data send to email successfully"));
    }
    catch (error) {
        console.error(error);
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            if (error.code == "P2002")
                return res
                    .status(409)
                    .json(new response_1.default(false, "content already saved"));
            if (error.code == "P2003")
                return res
                    .status(404)
                    .json(new response_1.default(false, "resource to be saved does not exist"));
        }
        return res
            .status(500)
            .json(new response_1.default(false, "error while processing request"));
    }
};
