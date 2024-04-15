"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = __importDefault(require("../../prisma/client/prismaClient"));
const response_1 = __importDefault(require("../../types/response"));
const getTenders = async (req, res) => {
    const tendersPerPage = 10;
    const { verified, verified_by, posted_by, page } = req.query;
    try {
        let filtering = {};
        if (verified === "true") {
            filtering = {
                verified_by: { not: null },
            };
        }
        else if (verified === "false") {
            filtering = {
                verified_by: null,
            };
        }
        else if (verified_by && !posted_by) {
            filtering = {
                verified_by: parseInt(verified_by.toString()),
            };
        }
        else if (posted_by && !verified_by) {
            filtering = { posted_by: parseInt(posted_by.toString()) };
        }
        let tenders;
        let numberOfPages;
        if (page) {
            const totalTenders = await prismaClient_1.default.tender.count();
            numberOfPages = Math.ceil(totalTenders / tendersPerPage);
            tenders = await prismaClient_1.default.tender.findMany({
                skip: (parseInt(page.toString()) - 1) * tendersPerPage,
                take: tendersPerPage,
                where: filtering,
                include: {
                    files: true,
                },
            });
        }
        else {
            tenders = await prismaClient_1.default.tender.findMany({
                where: filtering,
                include: {
                    files: true,
                },
            });
        }
        return res.status(200).json(new response_1.default(true, "Tenders getted successfully.", {
            tenders,
            total_pages: numberOfPages,
            current_page: Number(page),
            next_page: page && parseInt(page?.toString()) !== numberOfPages
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
