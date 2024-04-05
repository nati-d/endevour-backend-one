"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("../controllers/index"));
const index_2 = __importDefault(require("../middlewares/index"));
const router = express_1.default.Router();
router.post("/auth/add-admin", [index_2.default.tokenAuth, index_2.default.adminAuth, index_2.default.superAdminAuth], index_1.default.addAdmin);
router.post("/auth/login", index_1.default.adminLogin);
router.get("/get-admins", [index_2.default.tokenAuth, index_2.default.adminAuth, index_2.default.superAdminAuth], index_1.default.getAdmins);
router.get("/confirm-password", [index_2.default.tokenAuth, index_2.default.adminAuth], index_1.default.confirmPassword);
router.post("/upload-profile-img", [
    index_2.default.tokenAuth,
    index_2.default.adminAuth,
    index_2.default.uploadFile("images/profile_images/admin").single("profile_image"),
]
// Controller.adminProfileImgUpload
);
router.post("/forgot-password", index_1.default.forgotPassword);
router.post("/verify-forgot-password-confirmation-code", index_1.default.verifyForgotPassword);
exports.default = router;
