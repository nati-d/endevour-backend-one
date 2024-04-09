"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import express, { Router } from "express";
const user_routes_1 = __importDefault(require("./user.routes"));
const admin_routes_1 = __importDefault(require("./admin.routes"));
const job_routes_1 = __importDefault(require("./job.routes"));
const tender_routes_1 = __importDefault(require("./tender.routes"));
const news_routes_1 = __importDefault(require("./news.routes"));
const exclusiveJob_routes_1 = __importDefault(require("./exclusiveJob.routes"));
const grant_routes_1 = __importDefault(require("./grant.routes"));
const blog_routes_1 = __importDefault(require("./blog.routes"));
var Routers;
(function (Routers) {
    Routers.adminRoutes = admin_routes_1.default;
    Routers.user = user_routes_1.default;
    Routers.job = job_routes_1.default;
    Routers.tender = tender_routes_1.default;
    Routers.news = news_routes_1.default;
    Routers.exclusiveJob = exclusiveJob_routes_1.default;
    Routers.grant = grant_routes_1.default;
    Routers.blog = blog_routes_1.default;
})(Routers || (Routers = {}));
exports.default = Routers;
