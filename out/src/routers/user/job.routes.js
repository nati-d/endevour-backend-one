"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middlewares_1 = __importDefault(require("../../middlewares"));
const controllers_1 = __importDefault(require("../../controllers"));
const router = express_1.default.Router();
router.get("/get-job-category", [middlewares_1.default.userAuth], controllers_1.default.getJobCategory);
router.get("/get-job-category-by-id", [middlewares_1.default.userAuth], controllers_1.default.getJobCategoryById);
router.post("/post-job", [middlewares_1.default.userAuth], controllers_1.default.insertJobPost);
router.get("/get-job-post", [middlewares_1.default.userAuth], controllers_1.default.getJobPost);
router.get("/get-job-post-by-id", [middlewares_1.default.userAuth], controllers_1.default.getJobPostById);
router.put("/update-job-post", [middlewares_1.default.userAuth], controllers_1.default.updateJobPost);
router.delete("/delete-job-post", [middlewares_1.default.userAuth], controllers_1.default.deleteJobPost);
exports.default = router;
