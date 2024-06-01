"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_routes_1 = __importDefault(require("./user.routes"));
__exportStar(require("./user.routes"), exports);
const admin_routes_1 = __importDefault(require("./admin.routes"));
const job_routes_1 = __importDefault(require("./job.routes"));
const tender_routes_1 = __importDefault(require("./tender.routes"));
const news_routes_1 = __importDefault(require("./news.routes"));
const exclusiveJob_routes_1 = __importDefault(require("./exclusiveJob.routes"));
const common_routes_1 = __importDefault(require("./common.routes"));
const grant_routes_1 = __importDefault(require("./grant.routes"));
const blog_routes_1 = __importDefault(require("./blog.routes"));
const sp_routes_1 = __importDefault(require("./sp.routes"));
const tag_routes_1 = __importDefault(require("./tag.routes"));
const auth_1 = __importDefault(require("./auth"));
const home_1 = __importDefault(require("./home"));
const verification_routes_1 = __importDefault(require("./verification.routes"));
const contactUs_routes_1 = __importDefault(require("./contactUs.routes"));
var Routers;
(function (Routers) {
    Routers.adminRoutes = admin_routes_1.default;
    Routers.user = user_routes_1.default;
    Routers.job = job_routes_1.default;
    Routers.tender = tender_routes_1.default;
    Routers.news = news_routes_1.default;
    Routers.exclusiveJob = exclusiveJob_routes_1.default;
    Routers.common = common_routes_1.default;
    Routers.grant = grant_routes_1.default;
    Routers.blog = blog_routes_1.default;
    Routers.sp = sp_routes_1.default;
    Routers.tag = tag_routes_1.default;
    Routers.auth = auth_1.default;
    Routers.home = home_1.default;
    Routers.verification = verification_routes_1.default;
    Routers.customerFeadback = contactUs_routes_1.default;
})(Routers || (Routers = {}));
exports.default = Routers;
