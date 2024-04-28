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
    const { error } = index_2.default.sp.updateSp.validate(req.body);
    if (error) {
        return res.status(400).json(new response_1.default(false, "unidentified request content", error.details));
    }
    let updatedSp;
    try {
        updatedSp = await index_1.default.client.service_provider.update({
            where: { id: req.body.id },
            data: {
                email: req.body.email,
                phone: req.body.phone,
                about: req.body.about,
                service_category: req.body.service_category
            },
        });
        if (updatedSp.password)
            delete updatedSp.password;
        return res.status(200).json(new response_1.default(true, "service provider updated successfully", updatedSp));
    }
    catch (error) {
        console.error("Error while updating job post: ", error);
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2022")
                return res.status(403).json(new response_1.default(false, "not authorized to post blogs", error));
            if (error.code === "P2016")
                return res.status(404).json(new response_1.default(false, "resource to be updated not found", error));
        }
        res.status(500).json(new response_1.default(false, "Unknown error at updating job post", error));
    }
};
