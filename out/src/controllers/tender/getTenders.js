"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = __importDefault(require("../../prisma/client/prismaClient"));
const response_1 = __importDefault(require("../../types/response"));
const verificationFiltering_1 = __importDefault(require("../../helpers/verificationFiltering"));
const getTenders = async (req, res) => {
    const { verified_by, page } = req.query;
    const tendersPerPage = 10;
    try {
        let filtering = {};
        if (!req.auth)
            filtering = {
                verified_by: {
                    not: null,
                },
            };
        if (req.auth && verified_by) {
            filtering = (0, verificationFiltering_1.default)(parseInt(verified_by.toString()));
        }
        const tenders = await prismaClient_1.default.tender.findMany({
            skip: page ? (parseInt(page.toString()) - 1) * tendersPerPage : undefined,
            take: tendersPerPage,
            where: filtering,
            include: {
                files: true,
                tender_category: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });
        const numberOfPages = Math.ceil(tenders.length / tendersPerPage);
        return res.status(200).json(new response_1.default(true, "Tenders getted successfully.", {
            tenders,
            totalPages: numberOfPages,
            currentPage: Number(page),
            nextPage: page && parseInt(page?.toString()) < numberOfPages
                ? parseInt(page.toString()) + 1
                : null,
        }));
    }
    catch (error) {
        console.log(error);
        return res
            .status(500)
            .json(new response_1.default(false, "Something went wrong while getting tendrs."));
    }
};
exports.default = getTenders;
