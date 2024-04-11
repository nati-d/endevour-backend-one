"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../../prisma/index"));
const client_1 = require("@prisma/client");
const index_2 = __importDefault(require("../../validation/index"));
exports.default = async (req, res) => {
    try {
        const { error } = index_2.default.job.deleteJobPost.validate(req.body);
        if (error) {
            return res.status(400).send({
                success: false,
                message: error.details,
                data: null
            });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(400).send({
            status: false,
            message: "Error at request validation",
            description: error
        });
    }
    let deletedJobPost;
    try {
        if (req?.auth?.role == "ADMIN" || req?.auth?.role == "SUPER_ADMIN")
            deletedJobPost = await index_1.default.client.job_post.delete({
                where: {
                    id: req.body.id
                }
            });
    }
    catch (error) {
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            if (error.code = "P2015") {
                return res.status(400).json({
                    status: false,
                    message: 'Record to delete does not exist',
                    error: error,
                });
            }
        }
        console.error("Error while deleting job post:", error);
        return res.status(500).json({
            success: false,
            message: "Unknown error at deleting job post",
            error: error
        });
    }
    return res.status(200).json({
        success: true,
        message: "job post deleted successfully",
        data: deletedJobPost
    });
};
