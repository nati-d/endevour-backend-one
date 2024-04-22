"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../../prisma/index"));
const client_1 = require("@prisma/client");
const index_2 = __importDefault(require("../../validation/index"));
const response_1 = __importDefault(require("../../types/response"));
exports.default = async (req, res) => {
    const { error } = index_2.default.blog.createBlog.validate(req.body);
    if (error) {
        return res.status(400).json(new response_1.default(false, "unidentified request content", error.details));
    }
    try {
        let newBlog;
        newBlog = await index_1.default.client.blog.create({
            data: {
                title: req.body.title,
                overview: req.body.overview,
                body: req.body.body,
                verified_by: req.auth?.is_admin == true ? req.auth?.id : null,
                posted_by: req.auth?.is_admin == false ? req.auth?.id : null,
                tags: {
                    connectOrCreate: req.body.tags.map((name) => ({
                        where: { name },
                        create: { name }
                    }))
                }
            },
            include: {
                tags: { select: { name: true } }
            }
        });
        res.status(201).json(new response_1.default(true, "new blog created successfully", newBlog));
    }
    catch (error) {
        console.log(error);
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError &&
            error.code === "P2022") {
            return res.status(400).json(new response_1.default(false, "not authorized to post blogs"));
        }
        res.status(400).json(new response_1.default(false, "error while creating blog", error));
    }
};
