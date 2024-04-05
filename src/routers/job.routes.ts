import express, { Router } from "express";
import Middleware from "../middlewares/index";
import Controller from "../controllers/index";

const router: Router = express.Router();

router.post("/insert-job-category", [ Middleware.tokenAuth, Middleware.adminAuth ], Controller.insertJobCategory);

router.get("/get-job-category", [Middleware.tokenAuth], Controller.getJobCategory);

// router.put("/delete-job-category", [Middleware.tokenAuth, Middleware.adminAuth], Controller.deleteJobCatagory);

router.post("/post-job", [Middleware.tokenAuth, Middleware.adminAuth], Controller.insertJobPost);

router.get("/get-job-post", [Middleware.tokenAuth, Middleware.adminAuth], Controller.getJobPost);

router.put("/update-job-post", [Middleware.tokenAuth, Middleware.adminAuth], Controller.updateJobPost);

router.delete("/delete-job-post", [ Middleware.tokenAuth, Middleware.adminAuth ], Controller.deleteJobPost);

export default router;
