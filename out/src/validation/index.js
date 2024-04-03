"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("./user"));
const admin_1 = __importDefault(require("./admin"));
const job_1 = __importDefault(require("./job"));
var Validator;
(function (Validator) {
    Validator.user = user_1.default;
    Validator.admin = admin_1.default;
    Validator.job = job_1.default;
})(Validator || (Validator = {}));
exports.default = Validator;
