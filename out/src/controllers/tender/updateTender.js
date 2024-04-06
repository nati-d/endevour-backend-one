"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const response_1 = __importDefault(require("../../types/response"));
const prismaClient_1 = __importDefault(require("../../prisma/client/prismaClient"));
const updateTender = async (req, res) => {
    try {
        const body = req.body;
        const { tender_id } = req.query;
        console.log(tender_id);
        const updatedTender = await prismaClient_1.default.tender.update({
            where: { id: Number(tender_id) },
            data: {
                title: body.title,
                overview: body.overview,
                body: body.body,
                price: body.price,
                starting_bid: body.starting_bid,
                eligibility: true,
                status: body.status,
                category: body.category,
                opening_date: body.opening_date,
                closing_date: body.closing_date,
            },
        });
        return res.json(new response_1.default(true, "Tender updated successfully", updatedTender));
    }
    catch (error) {
        console.error("Error updating tender:", error);
        return res
            .status(500)
            .json(new response_1.default(false, "Internal server error"));
    }
};
exports.default = updateTender;
