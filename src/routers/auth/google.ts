import { Router } from 'express';
import passport from "passport";

const router = Router();

router.get('/',
  passport.authenticate('google')
);

router.get('/callback',
  passport.authenticate('google', {
    failureRedirect: '/auth/google/failure'
  }),
  (req, res) => {
    res.redirect(process.env.PASSPORT_LOGIN_SUCCESS_REDIRECT as string);
  }
);

router.get('/failure', (req, res) => {
  res.send('google log in failure');
});

export default router;
