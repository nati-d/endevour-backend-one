"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const response_1 = __importDefault(require("../../types/response"));
const prismaClient_1 = __importDefault(require("../../prisma/client/prismaClient"));
const updateTender = async (req, res) => {
    try {
        const { id } = req.params;
        req.body.price = parseFloat(req.body.price);
        req.body.starting_bid = parseFloat(req.body.starting_bid);
        const updatedTender = await prismaClient_1.default.tender.update({
            where: { id: Number(id) },
            data: {
                title: req.body.title,
                overview: req.body.overview,
                body: req.body.body,
                price: req.body.price,
                starting_bid: 123,
                eligibility: true,
                status: req.body.status,
                category: req.body.category,
                opening_date: req.body.opening_date,
                closing_date: req.body.closing_date,
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
