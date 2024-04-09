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
        const { error } = index_2.default.blog.deleteBlog.validate(req.body);
        if (error) {
            return res.status(400).json(new response_1.default(false, "unidentified request content", error.details));
        }
    }
    catch (error) {
        return res.status(400).json(new response_1.default(false, "error at validating request"));
    }
    try {
        let newBlog;
        if (req.auth?.role == "ADMIN" || req.auth?.role == "SUPER_ADMIN")
            newBlog = await index_1.default.client.blog.delete({
                where: { id: req.body.id },
            });
        else
            newBlog = await index_1.default.client.blog.delete({
                where: { id: req.body.id },
            });
        res.status(201).json(new response_1.default(true, "blog deleted successfully", newBlog));
    }
    catch (error) {
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError &&
            error.code === "P2022") {
            return res.status(400).json(new response_1.default(false, "not authorized to post blogs"));
        }
        res.status(400).json(new response_1.default(false, "error while creating blog"));
    }
};
