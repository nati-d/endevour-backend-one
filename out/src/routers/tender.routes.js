"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = __importDefault(require("../controllers"));
const middlewares_1 = __importDefault(require("../middlewares"));
const router = express_1.default.Router();
router.post("/post", [
    middlewares_1.default.tokenAuth,
    middlewares_1.default.uploadFile("files/tender_files").array("files"),
], controllers_1.default.createTender);
router.delete("/delete", [middlewares_1.default.tokenAuth], controllers_1.default.deleteTender);
router.post("/category/create", [middlewares_1.default.tokenAuth, middlewares_1.default.adminAuth], controllers_1.default.createTenderCategory);
router.put("/category/update", [middlewares_1.default.tokenAuth, middlewares_1.default.adminAuth], controllers_1.default.updateTenderCategory);
router.delete("/category/delete", [middlewares_1.default.tokenAuth, middlewares_1.default.adminAuth], controllers_1.default.deleteTenderCategory);
router.get("/category/get-category-by-id", [middlewares_1.default.tokenAuth, middlewares_1.default.adminAuth], controllers_1.default.getTenderCategory);
router.get("/category/get-all-categories", controllers_1.default.getAllTenderCategories);
exports.default = router;
