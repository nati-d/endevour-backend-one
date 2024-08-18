"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = __importDefault(require("../../prisma/client/prismaClient"));
const response_1 = __importDefault(require("../../types/response"));
const verificationFiltering_1 = __importDefault(require("../../helpers/verificationFiltering"));
const getTenders = async (req, res) => {
    const { verified_by, page, category, status, tags, opportunity_size_lt, opportunity_size_gt, } = req.query;
    const tendersPerPage = 10;
    try {
        const statusArray = status ? status.split(",") : undefined;
        const tagsArray = tags ? tags.split(",") : undefined;
        let verifiedBy;
        if (!req.auth) {
            verifiedBy = {
                not: null,
            };
        }
        if (req.auth && verified_by) {
            verifiedBy = (0, verificationFiltering_1.default)(parseInt(verified_by.toString()));
        }
        const totalTenders = await prismaClient_1.default.tender.count();
        const tenders = await prismaClient_1.default.tender.findMany({
            skip: page ? (parseInt(page.toString()) - 1) * tendersPerPage : undefined,
            take: tendersPerPage,
            where: {
                verified_by: verifiedBy,
                category: category ? parseInt(category?.toString()) : undefined,
                opportunity_size: {
                    lt: opportunity_size_lt
                        ? parseInt(opportunity_size_lt.toString())
                        : undefined,
                    gt: opportunity_size_gt
                        ? parseInt(opportunity_size_gt.toString())
                        : undefined,
                },
                status: {
                    in: statusArray,
                },
                tags: {
                    some: {
                        name: {
                            in: tagsArray,
                        },
                    },
                },
            },
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
        const numberOfPages = Math.ceil(totalTenders / tendersPerPage);
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
