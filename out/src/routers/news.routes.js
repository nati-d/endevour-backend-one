"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("../controllers/index"));
const index_2 = __importDefault(require("../middlewares/index"));
const router = express_1.default.Router();
router.get("/search-by-keyword", index_1.default.searchNewsByKeyWord);
router.post("/create-news", [
    index_2.default.tokenAuth,
    index_2.default.adminAuth,
    index_2.default.uploadFile().array("thumbnail"),
], index_1.default.createNews);
router.get("/get-news", index_1.default.getNews);
router.get("/get-news-by-id", index_1.default.getNewsById);
router.put("/update-news", [
    index_2.default.tokenAuth,
    index_2.default.adminAuth,
    index_2.default.uploadFile().array("thumbnail"),
], index_1.default.updateNews);
router.delete("/delete-news", [index_2.default.tokenAuth, index_2.default.adminAuth], index_1.default.deleteNews);
exports.default = router;
