"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = __importDefault(require("../../prisma/client/prismaClient"));
const response_1 = __importDefault(require("../../types/response"));
const searchByKeyWord = async (req, res) => {
    try {
        const searchKeyWord = req.query.keyword;
        const results = await prismaClient_1.default.grant.findMany({
            where: {
                OR: [
                    {
                        title: {
                            contains: searchKeyWord?.toString(),
                        },
                    },
                    {
                        tags: {
                            some: {
                                name: {
                                    contains: searchKeyWord?.toString(),
                                },
                            },
                        },
                    },
                ],
            },
            include: {
                tags: true,
            },
        });
        return res
            .status(200)
            .json(new response_1.default(true, "Search results. ", results));
    }
    catch (error) {
        return res
            .status(500)
            .json(new response_1.default(false, "Failed to get search results", null, error));
    }
};
exports.default = searchByKeyWord;
