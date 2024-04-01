import express from "express";
const router = express.Router();
import Controllers from "../controllers/index";
import Middlewares from "../middlewares/index";
router.post(
  "/add-admin",
  [Middlewares.adminAuth, Middlewares.superAdminAuth],
  Controllers.addAdmin
);

export default router;
