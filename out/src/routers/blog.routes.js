"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("../controllers/index"));
const index_2 = __importDefault(require("../middlewares/index"));
const router = express_1.default.Router();
router.get("/search-by-keyword", index_1.default.searchBlogsByKeyWord);
router.post("/create-blog", [index_2.default.tokenAuth], index_1.default.createBlog);
router.get("/get-blog", index_2.default.tokenForAdmin, index_1.default.getBlog);
router.get("/get-blog-by-id", index_1.default.getBlogById);
router.put("/update-blog", [index_2.default.tokenAuth], index_1.default.updateBlog);
router.delete("/delete-blog", [index_2.default.tokenAuth], index_1.default.deleteBlog);
exports.default = router;
