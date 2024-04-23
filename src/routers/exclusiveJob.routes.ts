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

router.post("/create", ExclusiveJob.createExclusiveJob, Middlewares.sendEmail);

router.get("/get/:id", ExclusiveJob.getExclusiveJob);

router.get("/all", ExclusiveJob.getExclusiveJobs);

router.delete("/delete/:id", ExclusiveJob.deleteExclusiveJob);

router.post(
  "/recommended-applicant/create",
  Middlewares.uploadFile("files/exclusive_job/applicant_cv").single("cv"),
  ExclusiveJob.createRecommendedApplicant
);

router.get(
  "/recommended-applicant/get/:id",
  ExclusiveJob.getRecommendedApplicant
);

router.get("/recommended-applicant/all", ExclusiveJob.getRecommendedApplicants);

router.put(
  "/recommended-applicant/update",
  ExclusiveJob.acceptDeclineApplicant,
  Middlewares.sendEmail
);
export default router;
