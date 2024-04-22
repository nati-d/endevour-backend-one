import express, { Router } from "express";
import prisma from "../prisma/";
import Controller from "../controllers";

const router: Router = express.Router();

router.post("/auth/signup", Controller.userSignup);

router.post("/auth/signin", Controller.userSignin);

export default router;
