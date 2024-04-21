import { Router } from "express";
import _job from "./job.routes";
import _blog from "./blog.routes";

const router = Router();

router.use('/job', _job);

router.use('/blog', _blog);

export default router;
