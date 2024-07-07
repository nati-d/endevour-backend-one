import { Router, Request, Response } from 'express';
import passport from "passport";

const router = Router();

router.get('/',
    passport.authenticate('google')
);

router.get('/callback',
    passport.authenticate('google', {
        successRedirect: process.env.PASSPORT_SUCCESS_REDIRECT as string,
        failureRedirect: process.env.PASSPORT_FAILURE_REDIRECT as string
    })
);

router.get('/failure', (req: Request, res: Response) => {
    res.status(400).send('google log in failure');
});

export default router;
