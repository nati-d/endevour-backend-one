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
const createRecommender = async (req, res) => {
    try {
        const { error } = validation_1.default.recommender.Recommender.validate(req.body);
        if (error)
            return res.status(400).json(new response_1.default(false, error.message));
        if (!req.auth)
            return;
        const { first_name, last_name, email, password } = req.body;
        const verified_by = req.auth?.id;
        const newRecommender = await prismaClient_1.default.recommender.create({
            data: {
                first_name,
                last_name,
                email,
                verified_by,
            },
        });
        return res.status(201).json(new response_1.default(true, "Recommender created successfully.", lodash_1.default.pickBy(newRecommender, (value, key) => key !== "password")));
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
