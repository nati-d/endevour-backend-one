import express from "express";
import Controller from "../controllers/index";
import Middleware from "../middlewares/index";

const router = express.Router();

router.post("/auth/login", Controller.adminLogin);

// Accessed by only authorized and authenticated admins
router.use(Middleware.tokenAuth);
router.use(Middleware.adminAuth);

router.get("/confirm-password", Controller.confirmPassword);
router.post(
  "/upload-profile-img",
  Middleware.uploadFile("images/profile_images/admin").single("profile_image"),
  Controller.adminProfileImgUpload
);
router.put("/update-profile", Controller.updateAdminProfile);
router.put("/change-password", Controller.changeAdminPassword);

// Accessed only by super_admins
router.use(Middleware.superAdminAuth);

router.post("/auth/add-admin", Controller.addAdmin, Middleware.sendEmail);
router.get("/get-admins", Controller.getAdmins);
router.put("/update-role", Controller.updateAdminRole);

export default router;
