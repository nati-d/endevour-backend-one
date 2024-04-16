import express, { Router } from "express";
import Middleware from "../middlewares/index";
import Controller from "../controllers/index";

const router: Router = express.Router();

router.post("/insert-job-category", [ Middleware.tokenAuth, Middleware.adminAuth], Controller.insertJobCategory);

router.get("/get-job-category", [Middleware.tokenAuth], Controller.getJobCategory);

router.get("/get-job-category-by-id", [Middleware.tokenAuth], Controller.getJobCategoryById);

router.put("/update-job-category", [Middleware.tokenAuth, Middleware.adminAuth], Controller.updateJobCategory);

router.delete("/delete-job-category", [Middleware.tokenAuth, Middleware.adminAuth], Controller.deleteJobCategory);

router.post("/post-job", [Middleware.tokenAuth, Middleware.adminAuth], Controller.insertJobPost);

router.get("/get-job-post", [Middleware.tokenAuth, Middleware.adminAuth], Controller.getJobPost);

router.get("/get-job-post-by-id", [Middleware.tokenAuth], Controller.getJobPostById);

router.put("/update-job-post", [Middleware.tokenAuth, Middleware.adminAuth], Controller.updateJobPost);

router.delete("/delete-job-post", [ Middleware.tokenAuth, Middleware.adminAuth ], Controller.deleteJobPost);

export default router;
