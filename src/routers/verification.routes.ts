import express from "express";
import Middlewares from "../middlewares";
import Verification from "../controllers/verification";

const router = express.Router();

router.use(Middlewares.tokenAuth);
router.use(Middlewares.adminAuth);

router.put(
  "/tender/:tender_id",
  Verification.verifyTender,
  Middlewares.sendEmail
);

router.put("/job/:job_id", Verification.verifyJob, Middlewares.sendEmail);

router.put("/blog/:blog_id", Verification.verifyBlog, Middlewares.sendEmail);

router.put(
  "/service-provider/:SP_id",
  Verification.verifySP,
  Middlewares.sendEmail
);

export default router;
