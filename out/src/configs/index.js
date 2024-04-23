"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_1 = __importDefault(require("./cookie"));
var Config;
(function (Config) {
    Config.cookie = cookie_1.default;
})(Config || (Config = {}));
exports.default = Config;
