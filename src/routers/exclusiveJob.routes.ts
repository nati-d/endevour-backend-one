import express from "express";
import ExclusiveJob from "../controllers/exclusive_job";
import Middlewares from "../middlewares";
const router = express.Router();

router.post(
  "/recommender/create",
  [Middlewares.tokenAuth, Middlewares.adminAuth],
  ExclusiveJob.createRecommender
);

router.get(
  "/recommender/all",
  [Middlewares.tokenAuth, Middlewares.adminAuth],
  ExclusiveJob.getRecommenders
);

router.get(
  "/recommender/get-by-id/:recommender_id",
  [Middlewares.tokenAuth, Middlewares.adminAuth],
  ExclusiveJob.getRecommender
);

router.put(
  "/recommender/update/:recommender_id",
  [Middlewares.tokenAuth, Middlewares.adminAuth],
  ExclusiveJob.updateRecommender
);

router.delete(
  "/recommender/delete/:recommender_id",
  [Middlewares.tokenAuth, Middlewares.adminAuth],
  ExclusiveJob.deleteRecommender
);

export default router;
