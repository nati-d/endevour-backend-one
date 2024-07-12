import express from "express";
import Controller from "../controllers";
import Middlewares from "../middlewares";

const router = express.Router();

router.use(Middlewares.tokenAuth);
router.post("/create", Controller.createPersonalizedAlert);
router.get("/get-alerts", Controller.getPersonalizedAlert);
export default router;
