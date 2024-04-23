"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("../../controllers/index"));
const index_2 = __importDefault(require("../../middlewares/index"));
const router = express_1.default.Router();
router.post("/create-grant", [index_2.default.tokenAuth, index_2.default.adminAuth], index_1.default.createGrant);
router.get("/get-grant", [index_2.default.tokenAuth], index_1.default.getGrant);
router.get("/get-grant-by-id", [index_2.default.tokenAuth], index_1.default.getGrantById);
router.put("/update-grant", [index_2.default.tokenAuth, index_2.default.adminAuth], index_1.default.updateGrant);
router.delete("/delete-grant", [index_2.default.tokenAuth, index_2.default.adminAuth], index_1.default.deleteGrant);
exports.default = router;
