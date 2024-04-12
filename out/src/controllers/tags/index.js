"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const createTag_1 = __importDefault(require("./createTag"));
const updateTag_1 = __importDefault(require("./updateTag"));
const deleteTag_1 = __importDefault(require("./deleteTag"));
const getTags_1 = __importDefault(require("./getTags"));
var Tag;
(function (Tag) {
    Tag.createTag = createTag_1.default;
    Tag.updateTag = updateTag_1.default;
    Tag.deleteTag = deleteTag_1.default;
    Tag.getTags = getTags_1.default;
})(Tag || (Tag = {}));
exports.default = Tag;
