"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const verifyTender_1 = __importDefault(require("./verifyTender"));
const verifyJob_1 = __importDefault(require("./verifyJob"));
const verifyBlog_1 = __importDefault(require("./verifyBlog"));
const verifyServiceProvider_1 = __importDefault(require("./verifyServiceProvider"));
var Verification;
(function (Verification) {
    Verification.verifyTender = verifyTender_1.default;
    Verification.verifyJob = verifyJob_1.default;
    Verification.verifyBlog = verifyBlog_1.default;
    Verification.verifySP = verifyServiceProvider_1.default;
})(Verification || (Verification = {}));
exports.default = Verification;
