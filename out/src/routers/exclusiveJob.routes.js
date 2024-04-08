"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const exclusive_job_1 = __importDefault(require("../controllers/exclusive_job"));
const middlewares_1 = __importDefault(require("../middlewares"));
const router = express_1.default.Router();
router.post("/recommender/create", [middlewares_1.default.tokenAuth, middlewares_1.default.adminAuth], exclusive_job_1.default.createRecommender);
router.get("/recommender/all", [middlewares_1.default.tokenAuth, middlewares_1.default.adminAuth], exclusive_job_1.default.getRecommenders);
router.get("/recommender/get-by-id/:recommender_id", [middlewares_1.default.tokenAuth, middlewares_1.default.adminAuth], exclusive_job_1.default.getRecommender);
router.put("/recommender/update/:recommender_id", [middlewares_1.default.tokenAuth, middlewares_1.default.adminAuth], exclusive_job_1.default.updateRecommender);
router.delete("/recommender/delete/:recommender_id", [middlewares_1.default.tokenAuth, middlewares_1.default.adminAuth], exclusive_job_1.default.deleteRecommender);
exports.default = router;
