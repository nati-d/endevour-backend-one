import express, { Router } from "express";
import Middleware from "../middlewares/index";
import Controller from "../controllers/index";

const router: Router = express.Router();

router.post("/insert-job-catagory", [ Middleware.tokenAuth, Middleware.adminAuth ], Controller.insertJobCatagory);

router.post("/post-job", [Middleware.tokenAuth, Middleware.adminAuth], Controller.insertJobPost);

router.put("/update-job-post", [Middleware.tokenAuth, Middleware.adminAuth], Controller.updateJobPost);

router.delete("/delete-job-post", [ Middleware.tokenAuth, Middleware.adminAuth ], Controller.deleteJobPost);

export default router;
