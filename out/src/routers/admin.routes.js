"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("../controllers/index"));
const index_2 = __importDefault(require("../middlewares/index"));
const router = express_1.default.Router();
router.post("/auth/login", index_1.default.adminLogin);
// Accessed by only authorized and authenticated admins
router.use(index_2.default.tokenAuth);
router.use(index_2.default.adminAuth);
router.get("/confirm-password", index_1.default.confirmPassword);
router.post("/upload-profile-img", index_2.default.uploadFile("images/profile_images/admin").single("profile_image"), index_1.default.adminProfileImgUpload);
router.put("/update-profile", index_1.default.updateAdminProfile);
router.put("/change-password", index_1.default.changeAdminPassword);
// Accessed only by super_admins
router.use(index_2.default.superAdminAuth);
router.post("/auth/add-admin", index_1.default.addAdmin, index_2.default.sendEmail);
router.get("/get-admins", index_1.default.getAdmins);
router.put("/update-role", index_1.default.updateAdminRole);
router.get("/dashboard/get-datas", index_1.default.getDashboardData);
exports.default = router;
