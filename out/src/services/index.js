"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const forgotPassword_1 = __importDefault(require("./passwordReset/forgotPassword"));
const verifyConfirmationCode_1 = __importDefault(require("./passwordReset/verifyConfirmationCode"));
var Services;
(function (Services) {
    Services.b = bcrypt_1.default;
    Services.forgotPassword = forgotPassword_1.default;
    Services.verifyConfirmationCode = verifyConfirmationCode_1.default;
})(Services || (Services = {}));
exports.default = Services;
