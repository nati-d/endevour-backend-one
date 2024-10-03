"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const cloudinary_1 = require("cloudinary");
const { CloudinaryStorage } = require('multer-storage-cloudinary');
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
const uploadFile = () => {
    const storage = new CloudinaryStorage({
        cloudinary: cloudinary_1.v2,
        params: {
            folder: 'devidends',
            resource_type: 'auto',
            public_id: (req, file) => {
                const userId = req.body.userId;
                const timestamp = Date.now();
                return `user_${userId}/image_${timestamp}`;
            },
        },
    });
    const parser = (0, multer_1.default)({ storage: storage });
    return parser;
};
exports.default = uploadFile;
