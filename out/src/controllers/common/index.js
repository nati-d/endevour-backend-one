"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const forgotPassword_1 = __importDefault(require("./passwordReset/forgotPassword"));
const verifyConfirmationCode_1 = __importDefault(require("./passwordReset/verifyConfirmationCode"));
const getPostUrl_1 = __importDefault(require("./getPostUrl"));
var Common;
(function (Common) {
    Common.forgotPassword = forgotPassword_1.default;
    Common.verifyConfirmationCode = verifyConfirmationCode_1.default;
    Common.getPostUrl = getPostUrl_1.default;
})(Common || (Common = {}));
exports.default = Common;
