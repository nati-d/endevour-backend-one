"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = __importDefault(require("../../prisma/client/prismaClient"));
const admin_1 = require("../../validation/admin");
const lodash_1 = __importDefault(require("lodash"));
const response_1 = __importDefault(require("../../types/response"));
const sendEmail_1 = __importDefault(require("../../services/notifications/sendEmail"));
const hashPassword_1 = __importDefault(require("../../helpers/hashPassword"));
const client_1 = require("@prisma/client");
const addAdmin = async (req, res) => {
    const { first_name, last_name, email, password, phone_number, role } = req.body;
    const { error } = admin_1.newAdmin.validate(req.body);
    if (error)
        return res.status(400).json(new response_1.default(false, error.message));
    try {
        const hashedPassword = await (0, hashPassword_1.default)(password);
        const createAdmin = await prismaClient_1.default.admin.create({
            data: {
                first_name,
                last_name,
                email,
                phone_number,
                password: hashedPassword,
                role,
            },
        });
        await (0, sendEmail_1.default)(email, "Endevour Admin Credential", `<p> Email: <b> ${email}</b></p> <p> Password: <b>${password}</b></p> `);
        return res.status(201).json(new response_1.default(true, `Admin added successfully. We have send the credential to ${email}`, lodash_1.default.pickBy(createAdmin, (value, key) => key !== "password")));
    }
    catch (error) {
        console.log(error);
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2002")
                return res
                    .status(400)
                    .json(new response_1.default(false, "Admin email already exists!"));
        }
        await prismaClient_1.default.admin.delete({
            where: {
                email,
            },
        });
        return res
            .status(500)
            .json(new response_1.default(false, "Failed to created new admin please try again!", null, error));
    }
};
exports.default = addAdmin;
