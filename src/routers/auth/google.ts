import { Router, Request, Response } from 'express';
import passport from "passport";

const router = Router();

router.get('/',
    passport.authenticate('google')
);

router.get('/callback',
    passport.authenticate( 'google', {
        successRedirect: '/api/user/home',
        failureRedirect: '/auth/google'
    })
);

router.get('/failure', (req, res) => {
    res.send('google log in failure');
});

export default router;
