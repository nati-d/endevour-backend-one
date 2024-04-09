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
    try {
        const { error } = index_2.default.blog.updateBlog.validate(req.body);
        if (error) {
            return res.status(400).json(new response_1.default(false, "unidentified request content", error.details));
        }
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: "Error at request validation",
            data: error,
        });
    }
    try {
        let newBlog;
        if (req.auth?.role == "ADMIN" || req.auth?.role == "SUPER_ADMIN")
            newBlog = await index_1.default.client.blog.update({
                where: {
                    id: req.body.id
                },
                data: {
                    title: req.body.title,
                    overview: req.body.overview,
                    body: req.body.body,
                    verified_by: req.auth?.id,
                    tags: {
                        connectOrCreate: req.body.tags.map((id) => ({
                            where: { id },
                            create: { id }
                        })),
                        disconnect: req.body.tags_to_remove.map((id) => ({ id })),
                    }
                }
            });
        else
            newBlog = await index_1.default.client.blog.update({
                where: {
                    id: req.body.id,
                },
                data: {
                    title: req.body.title,
                    overview: req.body.overview,
                    body: req.body.body,
                    posted_by: req.auth?.id,
                    tags: {
                        connectOrCreate: req.body.tags.map((id) => ({
                            where: { id },
                            create: { id }
                        })),
                        disconnect: req.body.tags_to_remove.map((id) => ({ id })),
                    }
                }
            });
        res.status(201).json(new response_1.default(true, "new blog created successfully", newBlog));
    }
    catch (error) {
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError &&
            error.code === "P2022") {
            return res.status(400).json(new response_1.default(false, "not authorized to post blogs"));
        }
        res.status(400).json(new response_1.default(false, "error while creating blog"));
    }
};
