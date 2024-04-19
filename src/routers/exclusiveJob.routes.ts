import express from "express";
import ExclusiveJob from "../controllers/exclusive_job";
import Middlewares from "../middlewares";
const router = express.Router();

router.use(Middlewares.tokenAuth);
router.use(Middlewares.adminAuth);
router.post("/recommender/create", ExclusiveJob.createRecommender);

router.get("/recommender/all", ExclusiveJob.getRecommenders);

router.get(
  "/recommender/get-by-id/:recommender_id",
  ExclusiveJob.getRecommender
);

router.put(
  "/recommender/update/:recommender_id",
  ExclusiveJob.updateRecommender
);

router.delete(
  "/recommender/delete/:recommender_id",
  ExclusiveJob.deleteRecommender
);

router.post(
  "/create",
  Middlewares.uploadFile("files/exclusive_job").single("file"),
  ExclusiveJob.createExclusiveJob
);

router.post(
  "/recommended-applicant/create",
  Middlewares.uploadFile("files/exclusive_job/applicant_cv").single("cv"),
  ExclusiveJob.createRecommendedApplicant
);
router.get(
  "/recommended-applicant/get/:id",
  ExclusiveJob.getRecommendedApplicant
);
export default router;
