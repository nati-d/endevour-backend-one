import express from "express";
const router = express.Router();
import Controllers from "../controllers/index";
import Middlewares from "../middlewares/index";
router.post(
  "/auth/add-admin",
  [Middlewares.tokenAuth, Middlewares.adminAuth, Middlewares.superAdminAuth],
  Controllers.addAdmin
);
router.post("/auth/login", Controllers.adminLogin);
export default router;
