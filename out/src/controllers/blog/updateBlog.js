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
    const { error } = index_2.default.blog.updateBlog.validate(req.body);
    if (error) {
        return res.status(400).json(new response_1.default(false, "unidentified request content", error.details));
    }
    try {
        let blog;
        if (req.auth?.role == "ADMIN" || req.auth?.role == "SUPER_ADMIN")
            blog = await index_1.default.client.blog.update({
                where: {
                    id: req.body.id
                },
                data: {
                    verified_by: req.body.verify ? req.auth?.id : req.body.verify == false ? null : undefined,
                    tags: {
                        connectOrCreate: req.body.tags.map((name) => ({
                            where: { name },
                            create: { name }
                        })),
                        disconnect: req.body.tags_to_remove.map((name) => ({ name })),
                    }
                },
                include: { tags: { select: { name: true } } },
            });
        const blogToBeUpdated = await index_1.default.client.blog.findFirst({ where: { id: req.body.id } });
        if (blogToBeUpdated?.posted_by != req.auth?.id)
            return res.status(403).json(new response_1.default(false, "unable to update blog due to ownership of the post!"));
        blog = await index_1.default.client.blog.update({
            where: {
                id: req.body.id,
            },
            data: {
                title: req.body.title,
                overview: req.body.overview,
                body: req.body.body,
                tags: {
                    connectOrCreate: req.body.tags.map((name) => ({
                        where: { name },
                        create: { name }
                    })),
                    disconnect: req.body.tags_to_remove.map((name) => ({ name })),
                }
            },
            include: { tags: { select: { name: true } } }
        });
        res.status(200).json(new response_1.default(true, "new blog updated successfully", blog));
    }
    catch (error) {
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2022")
                return res.status(403).json(new response_1.default(false, "not authorized to update blogs", error));
            if (error.code === "P2016")
                return res.status(404).json(new response_1.default(false, "resource to be updated not found", error));
        }
        res.status(500).json(new response_1.default(false, "error while updating blog"));
    }
};
