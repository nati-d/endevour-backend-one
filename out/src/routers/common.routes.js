"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const common_1 = __importDefault(require("../controllers/common"));
const index_1 = __importDefault(require("../middlewares/index"));
router.post("/forgot-password", common_1.default.forgotPassword);
router.post("/verify-forgot-password-confirmation-code", common_1.default.verifyConfirmationCode);
router.post("/get-post-url", [
    index_1.default.tokenAuth,
    index_1.default.adminAuth,
    index_1.default.uploadFile("posts").single("post"),
], common_1.default.getPostUrl);
exports.default = router;
