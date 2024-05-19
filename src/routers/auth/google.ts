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
    // On successful authentication, redirect to the external domain
    res.redirect('https://www.endevour.org');
  }
);

router.get('/failure', (req, res) => {
  res.send('google log in failure');
});

export default router;
