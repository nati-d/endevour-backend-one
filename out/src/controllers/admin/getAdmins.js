"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = __importDefault(require("../../prisma/client/prismaClient"));
const lodash_1 = __importDefault(require("lodash"));
const response_1 = __importDefault(require("../../types/response"));
const admin_1 = require("../../validation/admin");
const getAdmins = async (req, res) => {
    const { error } = admin_1.adminRole.validate(req.query);
    const { page } = req.query;
    if (error)
        return res.status(400).json(new response_1.default(false, "Invalide role query"));
    const role = req.query.role;
    const adminsPerPage = 10;
    try {
        const totalAdmins = await prismaClient_1.default.admin.count();
        const getAdmins = await prismaClient_1.default.admin.findMany({
            skip: page ? (parseInt(page.toString()) - 1) * adminsPerPage : undefined,
            take: adminsPerPage,
            where: {
                role,
            },
            orderBy: {
                created_at: "desc",
            },
        });
        const numberOfPages = Math.ceil(totalAdmins / adminsPerPage);
        const passwordRemoved = getAdmins.map((element) => lodash_1.default.pickBy(element, (value, key) => key !== "password"));
        return res.status(200).json(new response_1.default(true, "Admins retrieved successfully.", {
            admins: passwordRemoved,
            totalPages: numberOfPages,
            currentPage: Number(page),
            nextPage: page && parseInt(page?.toString()) < numberOfPages
                ? parseInt(page.toString()) + 1
                : null,
        }));
    }
    catch (error) {
        return res
            .status(500)
            .json(new response_1.default(false, "Error while retrieving admins. please try again!"));
    }
};
exports.default = getAdmins;
