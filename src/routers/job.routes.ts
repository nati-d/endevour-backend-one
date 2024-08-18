import express, { Router } from "express";
import Middleware from "../middlewares";
import Controller from "../controllers";

const router: Router = express.Router();
router.get("/search-by-keyword", Controller.searchJobsByKeyWord);

router.post(
  "/insert-job-category",
  [Middleware.tokenAuth, Middleware.adminAuth],
  Controller.insertJobCategory
);

router.get("/get-job-category", Controller.getJobCategory);

router.get("/get-job-category-by-id", Controller.getJobCategoryById);

router.put(
  "/update-job-category",
  [Middleware.tokenAuth, Middleware.adminAuth],
  Controller.updateJobCategory
);

router.delete(
  "/delete-job-category",
  [Middleware.tokenAuth, Middleware.adminAuth],
  Controller.deleteJobCategory
);

router.post(
  "/post-job",
  [Middleware.tokenAuth],
  Controller.insertJobPost,
  Middleware.sendEmail
);

router.get("/get-job-post", Middleware.tokenForAdmin, Controller.getJobPost);

router.get("/get-job-post-by-id", Controller.getJobPostById);

router.put(
  "/update-job-post",
  [Middleware.tokenAuth],
  Controller.updateJobPost
);

router.delete(
  "/delete-job-post",
  [Middleware.tokenAuth],
  Controller.deleteJobPost
);

router.get(
  "/user/get-job-category",
  [Middleware.tokenAuth],
  Controller.getJobCategory
);

export default router;
