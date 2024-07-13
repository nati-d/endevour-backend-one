"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middlewares_1 = __importDefault(require("../middlewares"));
const verification_1 = __importDefault(require("../controllers/verification"));
const router = express_1.default.Router();
router.use(middlewares_1.default.tokenAuth);
router.use(middlewares_1.default.adminAuth);
router.put("/tender/:tender_id", verification_1.default.verifyTender, middlewares_1.default.sendEmail);
router.put("/job/:job_id", verification_1.default.verifyJob, middlewares_1.default.sendEmail);
router.put("/blog/:blog_id", verification_1.default.verifyBlog, middlewares_1.default.sendEmail);
router.put("/service-provider/:SP_id", verification_1.default.verifySP, middlewares_1.default.sendEmail);
exports.default = router;
