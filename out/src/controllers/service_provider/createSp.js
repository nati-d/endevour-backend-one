"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../../prisma/index"));
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validation_1 = __importDefault(require("../../validation"));
const response_1 = __importDefault(require("../../types/response"));
exports.default = async (req, res) => {
    const { error } = validation_1.default.sp.createSp.validate(req.body);
    if (error)
        return res
            .status(400)
            .send(new response_1.default(false, "unidentified request content", error.details));
    let password;
    try {
        password = bcrypt_1.default.hashSync(req.body.password, 10);
    }
    catch (error) {
        console.log(error);
        return res
            .status(500)
            .json(new response_1.default(false, "internal server error"));
    }
    try {
        let sp = await index_1.default.client.service_provider.create({
            data: {
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                about: req.body.about,
                service_category: req.body.service_category,
                password,
            },
        });
        delete sp?.password;
        sp.is_service_provider = true;
        let token = jsonwebtoken_1.default.sign(sp, process.env.JWT_KEY);
        return res
            .header("authorization", token)
            .status(201)
            .json(new response_1.default(true, "service provider created successfully", token));
    }
    catch (error) {
        console.log(error);
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            if (error.code == "P2003")
                return res
                    .status(400)
                    .json(new response_1.default(false, "unique key constraint error", error));
        }
        return res
            .status(500)
            .json(new response_1.default(false, "unknown error while creating service provider", error));
    }
};
