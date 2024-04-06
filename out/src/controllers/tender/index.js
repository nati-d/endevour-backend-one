"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const createTenderCategory_1 = __importDefault(require("./category/createTenderCategory"));
const updateTenderCategory_1 = __importDefault(require("./category/updateTenderCategory"));
const deleteTenderCategory_1 = __importDefault(require("./category/deleteTenderCategory"));
const getTenderCategory_1 = __importDefault(require("./category/getTenderCategory"));
const getAllTenderCategories_1 = __importDefault(require("./category/getAllTenderCategories"));
const deleteTender_1 = __importDefault(require("./deleteTender"));
const createTender_1 = __importDefault(require("./createTender"));
const updateTender_1 = __importDefault(require("./updateTender"));
const getTender_1 = __importDefault(require("./getTender"));
const getTenders_1 = __importDefault(require("./getTenders"));
var Tender;
(function (Tender) {
    // -- Tender category --//
    Tender.createTenderCategory = createTenderCategory_1.default;
    Tender.updateTenderCategory = updateTenderCategory_1.default;
    Tender.deleteTenderCategory = deleteTenderCategory_1.default;
    Tender.getTenderCategory = getTenderCategory_1.default;
    Tender.getAllTenderCategories = getAllTenderCategories_1.default;
    // -- Tender --//
    Tender.createTender = createTender_1.default;
    Tender.updateTender = updateTender_1.default;
    Tender.getTender = getTender_1.default;
    Tender.getTenders = getTenders_1.default;
    Tender.deleteTender = deleteTender_1.default;
})(Tender || (Tender = {}));
exports.default = Tender;
