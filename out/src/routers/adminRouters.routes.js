"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const index_1 = __importDefault(require("../controllers/index"));
const index_2 = __importDefault(require("../middlewares/index"));
router.post("/auth/add-admin", [index_2.default.tokenAuth, index_2.default.adminAuth, index_2.default.superAdminAuth], index_1.default.addAdmin);
router.post("/auth/login", index_1.default.adminLogin);
exports.default = router;
