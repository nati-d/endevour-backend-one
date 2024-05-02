"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middlewares_1 = __importDefault(require("../middlewares"));
const tender_1 = __importDefault(require("../controllers/tender"));
const router = express_1.default.Router();
// Accessed by all user.
router.get("/all/tenders", tender_1.default.getTenders);
router.get("/:tender_id", tender_1.default.getTender);
// Accessed by all authenticated user
router.use(middlewares_1.default.tokenAuth);
router.post("/post", middlewares_1.default.uploadFile("files/tender").array("files"), tender_1.default.createTender);
router.put("/update", tender_1.default.updateTender);
router.delete("/delete/:tender_id", tender_1.default.deleteTender);
// Accessed by only admins(authorized)
router.use(middlewares_1.default.adminAuth);
router.post("/category/create", tender_1.default.createTenderCategory);
router.put("/category/update", tender_1.default.updateTenderCategory);
router.delete("/category/delete", tender_1.default.deleteTenderCategory);
router.get("/category/get-category-by-id", tender_1.default.getTenderCategory);
router.get("/category/get-all-categories", tender_1.default.getAllTenderCategories);
exports.default = router;
