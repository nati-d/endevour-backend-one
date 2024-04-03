import express from "express";
import Controller from "../controllers/index";
import Middleware from "../middlewares/index";

const router = express.Router();

router.post(
  "/auth/add-admin",
  [Middleware.tokenAuth, Middleware.adminAuth, Middleware.superAdminAuth],
  Controller.addAdmin
);

router.post("/auth/login", Controller.adminLogin);

export default router;
