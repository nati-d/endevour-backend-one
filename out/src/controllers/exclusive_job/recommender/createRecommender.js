"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = __importDefault(require("../../../prisma/client/prismaClient"));
const response_1 = __importDefault(require("../../../types/response"));
const lodash_1 = __importDefault(require("lodash"));
const validation_1 = __importDefault(require("../../../validation"));
const client_1 = require("@prisma/client");
const hashPassword_1 = __importDefault(require("../../../helpers/hashPassword"));
const createRecommender = async (req, res, next) => {
    try {
        const { error } = validation_1.default.recommender.Recommender.validate(req.body);
        if (error)
            return res.status(400).json(new response_1.default(false, error.message));
        const { first_name, last_name, email, password, phone_number } = req.body;
        const verified_by = req.auth?.id;
        const hashedPassword = await (0, hashPassword_1.default)(password);
        const newRecommender = await prismaClient_1.default.user.create({
            data: {
                first_name,
                last_name,
                email,
                password: hashedPassword,
                phone_number,
                is_recommender: true,
                verified_by,
            },
        });
        req.emailData = {
            sendTo: email,
            subject: "Invited to be recommender of endevour exclusive job.",
            html: `<p> 
      <b>email: </b> ${email}<br/> <b>password: </b> ${password} <br/> You can login by goint to this link <a href="https://endevour.org/auth/sign-in">Login at endevour.org</a></p> `,
            statusCode: 201,
            resMessage: "Recommender created successfully.",
            otherData: lodash_1.default.pickBy(newRecommender, (value, key) => key !== "password"),
            queryOnFail: async () => await prismaClient_1.default.user.delete({
                where: {
                    id: newRecommender.id,
                },
            }),
        };
        next();
    }
    catch (error) {
        console.error("Error creating recommender:", error);
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2002")
                return res
                    .status(400)
                    .json(new response_1.default(false, "Recommender email already exists!"));
        }
        return res
            .status(500)
            .json(new response_1.default(false, "Failed while creating recommender please try again", error));
    }
};
exports.default = createRecommender;
