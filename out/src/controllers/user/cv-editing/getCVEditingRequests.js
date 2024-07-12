"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = __importDefault(require("../../../prisma/client/prismaClient"));
const response_1 = __importDefault(require("../../../types/response"));
const getCVEditingRequests = async (req, res) => {
    try {
        const getRequests = await prismaClient_1.default.cv_editing_requests.findMany({
            include: {
                user: {
                    select: {
                        email: true,
                        first_name: true,
                        last_name: true,
                        phone_number: true,
                    },
                },
            },
        });
        return res.status(200).json(new response_1.default(true, "Request geted successfully", {
            requests: getRequests,
        }));
    }
    catch (error) {
        console.log(error);
        return res
            .status(500)
            .json(new response_1.default(false, "Failed to get cv editing requests.", null, error));
    }
};
exports.default = getCVEditingRequests;
