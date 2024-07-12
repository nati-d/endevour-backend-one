"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = __importDefault(require("../controllers"));
const middlewares_1 = __importDefault(require("../middlewares"));
const router = express_1.default.Router();
router.use(middlewares_1.default.tokenAuth);
router.post("/create", controllers_1.default.createPersonalizedAlert);
router.get("/get-alerts", controllers_1.default.getPersonalizedAlert);
exports.default = router;
