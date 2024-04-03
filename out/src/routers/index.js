"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import express, { Router } from "express";
const userRouters_routes_1 = __importDefault(require("./userRouters.routes"));
const adminRouters_routes_1 = __importDefault(require("./adminRouters.routes"));
var Routers;
(function (Routers) {
    Routers.adminRoutes = adminRouters_routes_1.default;
    Routers.user = userRouters_routes_1.default;
})(Routers || (Routers = {}));
exports.default = Routers;
