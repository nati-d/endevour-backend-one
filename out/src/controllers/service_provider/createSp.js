"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../../prisma/index"));
const validation_1 = __importDefault(require("../../validation"));
const response_1 = __importDefault(require("../../types/response"));
exports.default = async (req, res) => {
    try {
        const { error } = validation_1.default.sp.createSp.validate(req.body);
        if (error) {
            return res.status(400).send(new response_1.default(false, "unidentified request content", error.details));
        }
    }
    catch (error) {
        return res.status(400).send(new response_1.default(false, "Error at request validation", error));
    }
    try {
        const sp = await index_1.default.client.service_provider.create({
            data: {
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                about: req.body.about,
                service_category: {
                    connect: req.body.tags.map((name) => ({
                        name: name,
                    }))
                }
            }
        });
        console.log(sp);
    }
    catch (error) {
        console.log(error);
    }
};
