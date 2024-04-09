"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("./user"));
const admin_1 = __importDefault(require("./admin"));
const job_1 = __importDefault(require("./job"));
const news_1 = __importDefault(require("./news"));
const grant_1 = __importDefault(require("./grant"));
const exclusiveJob_1 = __importDefault(require("./exclusiveJob"));
const blog_1 = __importDefault(require("./blog"));
var Validator;
(function (Validator) {
    Validator.user = user_1.default;
    Validator.admin = admin_1.default;
    Validator.job = job_1.default;
    Validator.news = news_1.default;
    Validator.recommender = exclusiveJob_1.default;
    Validator.grant = grant_1.default;
    Validator.blog = blog_1.default;
})(Validator || (Validator = {}));
exports.default = Validator;
