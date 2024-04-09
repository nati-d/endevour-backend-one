"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const createRecommender_1 = __importDefault(require("./recommender/createRecommender"));
const updateRecommender_1 = __importDefault(require("./recommender/updateRecommender"));
const deleteRecommender_1 = __importDefault(require("./recommender/deleteRecommender"));
const getRecommender_1 = __importDefault(require("./recommender/getRecommender"));
const getRecommenders_1 = __importDefault(require("./recommender/getRecommenders"));
const createExclusiveJob_1 = __importDefault(require("./createExclusiveJob"));
var ExclusiveJob;
(function (ExclusiveJob) {
    ExclusiveJob.createRecommender = createRecommender_1.default;
    ExclusiveJob.updateRecommender = updateRecommender_1.default;
    ExclusiveJob.deleteRecommender = deleteRecommender_1.default;
    ExclusiveJob.getRecommender = getRecommender_1.default;
    ExclusiveJob.getRecommenders = getRecommenders_1.default;
    ExclusiveJob.createExclusiveJob = createExclusiveJob_1.default;
})(ExclusiveJob || (ExclusiveJob = {}));
exports.default = ExclusiveJob;
