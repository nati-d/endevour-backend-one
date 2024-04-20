import { Router } from "express";
import _job from "./job.routes";

const router = Router();

router.use('/job', _job);

export default router;
