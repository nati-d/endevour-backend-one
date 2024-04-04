import express, { Router } from "express";
import Middleware from "../middlewares/index";
import Controller from "../controllers/index";

const router: Router = express.Router();

router.post("/insert-job-catagory", [ Middleware.tokenAuth, Middleware.adminAuth ], Controller.insertJobCatagory);

// router.get("/get-job-catagory", [Middleware.tokenAuth, Middleware.adminAuth], Controller.getJobCatagory);

// router.put("/delete-job-catagory", [Middleware.tokenAuth, Middleware.adminAuth], Controller.deleteJobCatagory);

router.post("/post-job", [Middleware.tokenAuth, Middleware.adminAuth], Controller.insertJobPost);

// router.get("/get-job-post", [Middleware.tokenAuth, Middleware.adminAuth], Controller.getJobPost);

router.put("/update-job-post", [Middleware.tokenAuth, Middleware.adminAuth], Controller.updateJobPost);

router.delete("/delete-job-post", [ Middleware.tokenAuth, Middleware.adminAuth ], Controller.deleteJobPost);

export default router;
