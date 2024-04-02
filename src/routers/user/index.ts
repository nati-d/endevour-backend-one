import express, { Router } from "express";
import signup from "./signup";

let router: Router = express.Router();

router.use("/signup", signup);

export default router;
