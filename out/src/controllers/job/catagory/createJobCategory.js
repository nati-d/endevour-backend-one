"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../../../prisma/index"));
const client_1 = require("@prisma/client");
const index_2 = __importDefault(require("../../../validation/index"));
exports.default = async (req, res) => {
    try {
        const { error } = index_2.default.job.jobCatagory.validate(req.body);
        if (error) {
            res.send({
                success: false,
                message: error.details,
                data: null
            });
            return;
        }
    }
    catch (error) {
        console.error(error);
        return res.status(400).send({
            status: false,
            message: "Error at request validation",
            description: error
        });
    }
    let newCatagory;
    try {
        newCatagory = await index_1.default.client.job_category.create({
            data: {
                name: req.body.name
            }
        });
    }
    catch (error) {
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
            return res.status(400).json({
                status: false,
                message: 'Duplicate catagory name',
                error: error,
            });
        }
        console.error("Error inserting user:", error);
        return res.status(500).send({
            success: false,
            message: 'Unknown error at registering user',
            error: error,
        });
    }
    res.send({
        success: true,
        message: "New job catagory is added",
        data: newCatagory,
    });
};
