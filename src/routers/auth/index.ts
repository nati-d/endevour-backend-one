import { Router } from 'express';

import _google from './google';

const router = Router();

router.use('/google', _google);

export default router;
