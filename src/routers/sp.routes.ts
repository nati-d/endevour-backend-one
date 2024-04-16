import { Router } from "express";

import Middleware from "../middlewares/index";
import Controller from "../controllers/index";

const router: Router = Router();

router.post("/create-service-provider", Controller.createSp);

export default router;
