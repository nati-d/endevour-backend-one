"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middlewares_1 = __importDefault(require("../middlewares"));
const tags_1 = __importDefault(require("../controllers/tags"));
const router = express_1.default.Router();
router.post("/create", [middlewares_1.default.tokenAuth, middlewares_1.default.adminAuth], tags_1.default.createTag);
router.put("/update", [middlewares_1.default.tokenAuth, middlewares_1.default.adminAuth], tags_1.default.updateTag);
router.delete("/delete/:tag_name", [middlewares_1.default.tokenAuth, middlewares_1.default.adminAuth], tags_1.default.deleteTag);
router.get("/get", [middlewares_1.default.tokenAuth, middlewares_1.default.adminAuth], tags_1.default.getTags);
exports.default = router;
