"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const contact_us_1 = __importDefault(require("../controllers/contact_us"));
const middlewares_1 = __importDefault(require("../middlewares"));
const router = express_1.default.Router();
router.post("/submit-feadback", contact_us_1.default.createContactUs);
// Accessed only by admins
router.use(middlewares_1.default.tokenAuth);
router.use(middlewares_1.default.adminAuth);
router.get("/get-feadbacks", contact_us_1.default.getFeadbacks);
router.get("/get-feadback/:feadback_id", contact_us_1.default.getFeadback);
router.delete("/delete/:feadback_id", contact_us_1.default.deleteFeadback);
router.post("/response-to-feadback", contact_us_1.default.responseToFeadback, middlewares_1.default.sendEmail);
exports.default = router;
