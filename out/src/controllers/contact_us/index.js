"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const createContactUs_1 = __importDefault(require("./createContactUs"));
const getFeadback_1 = __importDefault(require("./getFeadback"));
const getFeadbacks_1 = __importDefault(require("./getFeadbacks"));
const responseToFeadback_1 = __importDefault(require("./responseToFeadback"));
const deleteFeadback_1 = __importDefault(require("./deleteFeadback"));
var CustomerFeadback;
(function (CustomerFeadback) {
    CustomerFeadback.createContactUs = createContactUs_1.default;
    CustomerFeadback.getFeadback = getFeadback_1.default;
    CustomerFeadback.getFeadbacks = getFeadbacks_1.default;
    CustomerFeadback.responseToFeadback = responseToFeadback_1.default;
    CustomerFeadback.deleteFeadback = deleteFeadback_1.default;
})(CustomerFeadback || (CustomerFeadback = {}));
exports.default = CustomerFeadback;
