import express, { Router } from "express";
import Controller from "../controllers/index";

const router: Router = express.Router();

router.post("/auth/signup", Controller.userSignup);

export default router;
