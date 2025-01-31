import passport from 'passport';
import { config } from '@config/app.config';
import { Router } from 'express';
import { authControllers } from '@modules/auth';

// '/auth'
const authRoutes = Router();
const failureRedirect = `${config.CLIENT_GOOGLE_CALLBACK_URL}?status=failure`;

authRoutes.post('/register', authControllers.registerUserByEmail);
authRoutes.post('/login', authControllers.emailLogin);
authRoutes.post('/logout', authControllers.logOutController);

authRoutes.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);

authRoutes.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect
  }),
  authControllers.googleLoginCallback
);

export { authRoutes };
