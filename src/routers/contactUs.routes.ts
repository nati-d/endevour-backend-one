import express from "express";
import CustomerFeadback from "../controllers/contact_us";
import Middlewares from "../middlewares";

const router = express.Router();

router.post("/submit-feadback", CustomerFeadback.createContactUs);

// Accessed only by admins
router.use(Middlewares.tokenAuth);
router.use(Middlewares.adminAuth);

router.get("/get-feadbacks", CustomerFeadback.getFeadbacks);
router.get("/get-feadback/:feadback_id", CustomerFeadback.getFeadback);
router.delete("/delete/:feadback_id", CustomerFeadback.deleteFeadback);
router.post(
  "/response-to-feadback",
  CustomerFeadback.responseToFeadback,
  Middlewares.sendEmail
);
export default router;
