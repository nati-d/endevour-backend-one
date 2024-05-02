"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const exclusive_job_1 = __importDefault(require("../controllers/exclusive_job"));
const middlewares_1 = __importDefault(require("../middlewares"));
const router = express_1.default.Router();
router.use(middlewares_1.default.tokenAuth);
router.use(middlewares_1.default.adminAuth);
//Recommenders
router.post("/recommender/create", exclusive_job_1.default.createRecommender, middlewares_1.default.sendEmail);
router.get("/recommender/all", exclusive_job_1.default.getRecommenders);
router.get("/recommender/get-by-id/:recommender_id", exclusive_job_1.default.getRecommender);
router.put("/recommender/update/:recommender_id", exclusive_job_1.default.updateRecommender);
router.delete("/recommender/delete/:recommender_id", exclusive_job_1.default.deleteRecommender);
// Exclusive jobs
router.post("/create", exclusive_job_1.default.createExclusiveJob, middlewares_1.default.sendEmail);
router.get("/get/:id", exclusive_job_1.default.getExclusiveJob);
router.get("/all", exclusive_job_1.default.getExclusiveJobs);
router.delete("/delete/:id", exclusive_job_1.default.deleteExclusiveJob);
router.put("/update/:id", exclusive_job_1.default.updateExclusiveJob);
router.post("/send-more-emails", exclusive_job_1.default.sendEmailForRecommenders, middlewares_1.default.sendEmail);
// Recommended applicants
router.post("/recommended-applicant/create", middlewares_1.default.uploadFile("files/exclusive_job/applicant_cv").single("cv"), exclusive_job_1.default.createRecommendedApplicant);
router.get("/recommended-applicant/get/:id", exclusive_job_1.default.getRecommendedApplicant);
router.get("/recommended-applicant/all", exclusive_job_1.default.getRecommendedApplicants);
router.put("/recommended-applicant/update", exclusive_job_1.default.acceptDeclineApplicant, middlewares_1.default.sendEmail);
exports.default = router;
