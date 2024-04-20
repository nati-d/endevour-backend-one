import express, { Router } from "express";
import Middleware from "../../middlewares";
import Controller from "../../controllers";

const router: Router = express.Router();

router.get("/get-job-category", [Middleware.userAuth], Controller.getJobCategory);

router.get("/get-job-category-by-id", [Middleware.userAuth], Controller.getJobCategoryById);

router.post("/post-job", [Middleware.userAuth], Controller.insertJobPost);

router.get("/get-job-post", [Middleware.userAuth], Controller.getJobPost);

router.get("/get-job-post-by-id", [Middleware.userAuth], Controller.getJobPostById);

router.put("/update-job-post", [Middleware.userAuth], Controller.updateJobPost);

router.delete("/delete-job-post", [ Middleware.userAuth ], Controller.deleteJobPost);

export default router;
