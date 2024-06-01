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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const controllers_1 = __importDefault(require("../controllers"));
const middlewares_1 = __importDefault(require("../middlewares"));
const router = express_1.default.Router();
const savedRouter = (0, express_1.Router)();
router.post("/auth/signup", controllers_1.default.userSignup);
router.post("/auth/signin", controllers_1.default.userSignin);
router.post("/auth/verify-otp", controllers_1.default.verifyOtp);
savedRouter.post("/job", [middlewares_1.default.tokenAuth], controllers_1.default.saved.saveJob);
savedRouter.delete("/job", [middlewares_1.default.tokenAuth], controllers_1.default.saved.deleteJob);
savedRouter.get("/job", [middlewares_1.default.tokenAuth], controllers_1.default.saved.getJob);
savedRouter.post("/news", [middlewares_1.default.tokenAuth], controllers_1.default.saved.saveNews);
savedRouter.delete("/news", [middlewares_1.default.tokenAuth], controllers_1.default.saved.deleteNews);
savedRouter.get("/news", [middlewares_1.default.tokenAuth], controllers_1.default.saved.getNews);
savedRouter.post("/blog", [middlewares_1.default.tokenAuth], controllers_1.default.saved.saveBlog);
savedRouter.delete("/blog", [middlewares_1.default.tokenAuth], controllers_1.default.saved.deleteBlog);
savedRouter.get("/blog", [middlewares_1.default.tokenAuth], controllers_1.default.saved.getBlog);
savedRouter.post("/grant", [middlewares_1.default.tokenAuth], controllers_1.default.saved.saveGrant);
savedRouter.delete("/grant", [middlewares_1.default.tokenAuth], controllers_1.default.saved.deleteGrant);
savedRouter.get("/grant", [middlewares_1.default.tokenAuth], controllers_1.default.saved.getGrant);
savedRouter.post("/tender", [middlewares_1.default.tokenAuth], controllers_1.default.saved.saveTender);
savedRouter.delete("/tender", [middlewares_1.default.tokenAuth], controllers_1.default.saved.deleteTender);
savedRouter.get("/tender", [middlewares_1.default.tokenAuth], controllers_1.default.saved.getTender);
savedRouter.post("/organization", [middlewares_1.default.tokenAuth], controllers_1.default.saved.saveOrganization);
savedRouter.delete("/organization", [middlewares_1.default.tokenAuth], controllers_1.default.saved.deleteOrganization);
savedRouter.get("/organization", [middlewares_1.default.tokenAuth], controllers_1.default.saved.getOrganization);
savedRouter.post("/service-provider", [middlewares_1.default.tokenAuth], controllers_1.default.saved.saveServiceProvider);
savedRouter.delete("/service-provider", [middlewares_1.default.tokenAuth], controllers_1.default.saved.deleteServiceProvider);
savedRouter.get("/service-provider", [middlewares_1.default.tokenAuth], controllers_1.default.saved.getServiceProvider);
savedRouter.post("/procurement", middlewares_1.default.tokenAuth, controllers_1.default.saved.procurement, middlewares_1.default.sendEmail);
savedRouter.get("/get-procurement-history", [middlewares_1.default.tokenAuth, middlewares_1.default.adminAuth], controllers_1.default.saved.getProcurementHistory);
router.use("/saved", savedRouter);
exports.default = router;
