"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tokenAuth_1 = __importDefault(require("./tokenAuth"));
const adminAuth_1 = __importDefault(require("./admin/adminAuth"));
const superAdminAuth_1 = __importDefault(require("./admin/superAdminAuth"));
var Middlewares;
(function (Middlewares) {
    Middlewares.tokenAuth = tokenAuth_1.default;
    Middlewares.adminAuth = adminAuth_1.default;
    Middlewares.superAdminAuth = superAdminAuth_1.default;
})(Middlewares || (Middlewares = {}));
exports.default = Middlewares;
