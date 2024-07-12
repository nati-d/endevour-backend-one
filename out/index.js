"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import session from "express-session";
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
// import passport from "passport";
const routers_1 = __importDefault(require("./src/routers"));
require("./src/services");
const app = (0, express_1.default)();
// app.use(session(Config.cookie));
app.use((0, cors_1.default)({
    origin: "*",
    credentials: true,
}));
app.use(express_1.default.json());
app.use("/public", express_1.default.static("public"));
app.set("trust proxy", 1);
// app.use(passport.initialize());
// app.use(passport.session());
app.use("/auth", routers_1.default.auth);
app.use("/home", routers_1.default.home);
app.use("/api/user", routers_1.default.user);
app.use("/api/admin", routers_1.default.adminRoutes);
app.use("/api/job", routers_1.default.job);
app.use("/api/tender", routers_1.default.tender);
app.use("/api/news", routers_1.default.news);
app.use("/api/grant", routers_1.default.grant);
app.use("/api/grant", routers_1.default.grant);
app.use("/api/exclusive-job", routers_1.default.exclusiveJob);
app.use("/api/common", routers_1.default.common);
app.use("/api/blog", routers_1.default.blog);
app.use("/api/service-provider", routers_1.default.sp);
app.use("/api/tag", routers_1.default.tag);
app.use("/api/verify", routers_1.default.verification);
app.use("/api/feadback", routers_1.default.customerFeadback);
app.use("/api/personalized-alert", routers_1.default.personalizedAlert);
const port = 3000;
app.listen(port, () => console.log("Server started at port", port));
