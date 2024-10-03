"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startCronJob = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const prismaClient_1 = __importDefault(require("../../prisma/client/prismaClient"));
const closeExpiredTenders = async () => {
    try {
        const now = new Date();
        const expiredTenders = await prismaClient_1.default.tender.updateMany({
            where: {
                status: "open",
                closing_date: { lt: now },
            },
            data: {
                status: "closed",
            },
        });
        console.log(`Closed ${expiredTenders.count} expired tenders.`);
    }
    catch (error) {
        console.error("Error closing expired tenders:", error);
    }
};
const startCronJob = () => {
    node_cron_1.default.schedule("0 0 * * *", closeExpiredTenders);
};
exports.startCronJob = startCronJob;
