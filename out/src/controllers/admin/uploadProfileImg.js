"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = __importDefault(require("../../prisma/client/prismaClient"));
const response_1 = __importDefault(require("../../types/response"));
const uploadProfileImage = async (req, res) => {
    const id = parseInt(req.body.id);
    const img = req.file?.filename;
    try {
        await prismaClient_1.default.admin.update({
            where: {
                id: id,
            },
            data: {
                profile_image: img,
            },
        });
        return res
            .status(201)
            .json(new response_1.default(true, "Profile image uploaded successfully"));
    }
    catch (error) {
        console.log(error);
        return res
            .status(500)
            .json(new response_1.default(false, "Error while uploading profile image please try again"));
    }
};
exports.default = uploadProfileImage;
