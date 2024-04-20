import express, { Router } from "express";
import prisma from "../prisma/";
import Controller from "../controllers";
import userRouter from "./user"

const router: Router = express.Router();

router.post("/auth/signup", Controller.userSignup);

router.get("/home", Controller.userLogin);

router.use("/", userRouter);

export default router;
