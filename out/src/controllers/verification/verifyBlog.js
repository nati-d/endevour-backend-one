"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = __importDefault(require("../../prisma/client/prismaClient"));
const response_1 = __importDefault(require("../../types/response"));
const verifyBlog = async (req, res, next) => {
    try {
        const { blog_id } = req.params;
        const admin_id = req.auth.id;
        const selectBlog = await prismaClient_1.default.blog.findFirst({
            where: {
                id: parseInt(blog_id),
                posted_by: { not: null },
                verified_by: null,
            },
        });
        if (!selectBlog)
            return res
                .status(400)
                .json(new response_1.default(false, "Invalid data. Can't find blog post with the provided data!"));
        const verifiedBlog = await prismaClient_1.default.blog.update({
            where: {
                id: parseInt(blog_id),
            },
            data: {
                verified_by: admin_id,
            },
            include: {
                user: {
                    select: {
                        email: true,
                    },
                },
            },
        });
        if (!verifiedBlog.user?.email)
            return;
        req.emailData = {
            sendTo: verifiedBlog.user?.email,
            subject: "blog post verification",
            html: "<p> Congratulations your blog post is verified.",
            otherData: verifiedBlog,
            resMessage: "blog verified successfully.",
            statusCode: 201,
            queryOnFail: async () => await prismaClient_1.default.blog.update({
                where: {
                    id: parseInt(blog_id),
                },
                data: {
                    verified_by: null,
                },
            }),
        };
        next();
    }
    catch (error) {
        return res
            .status(500)
            .json(new response_1.default(false, "Failed to verify blog post", null, error));
    }
};
exports.default = verifyBlog;
