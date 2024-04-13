"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../../../prisma/index"));
const client_1 = require("@prisma/client");
const index_2 = __importDefault(require("../../../validation/index"));
const response_1 = __importDefault(require("../../../types/response"));
exports.default = async (req, res) => {
    const { error } = index_2.default.job.jobCatagory.validate(req.body);
    if (error) {
        res.send(new response_1.default(false, "unidentified request content", error.details));
        return;
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
            return res.status(400).json(new response_1.default(false, 'Duplicate catagory name', error));
        }
        console.error("Error inserting user:", error);
        return res.status(500).send(new response_1.default(false, 'Unknown error at registering user', error));
    }
    res.send(new response_1.default(true, "New job catagory is added", newCatagory));
};
