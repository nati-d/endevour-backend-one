"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = __importDefault(require("./client/prismaClient"));
var Prisma;
(function (Prisma) {
    Prisma.client = prismaClient_1.default;
})(Prisma || (Prisma = {}));
exports.default = Prisma;
