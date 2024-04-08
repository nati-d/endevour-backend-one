"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hashPassword_1 = __importDefault(require("./hashPassword"));
var Helper;
(function (Helper) {
    Helper.hashPassword = hashPassword_1.default;
})(Helper || (Helper = {}));
exports.default = Helper;
