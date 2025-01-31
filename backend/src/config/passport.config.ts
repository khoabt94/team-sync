import passport from 'passport';
import { config } from '@config/app.config';
import { AccountProviderEnum } from '@enums/account-provider.enum';
import { authServices } from '@/auth';
import { NotFoundException } from '@utils/app-error.util';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as LocalStrategy } from 'passport-local';

passport.use(
  new GoogleStrategy(
    {
      clientID: config.GOOGLE_CLIENT_ID,
      clientSecret: config.GOOGLE_CLIENT_SECRET,
      callbackURL: config.GOOGLE_CALLBACK_URL,
      passReqToCallback: true,
      scope: ['profile', 'email']
    },
    async function (request, accessToken, refreshToken, profile, done) {
      try {
        const { sub: providerId, name: displayName = '', picture, email } = profile._json;
        if (!providerId) {
          throw new NotFoundException('Google ID not found');
        }

        if (!email) {
          throw new NotFoundException('Email not found');
        }
        const { user } = await authServices.loginAndCreateAccountWithProviderService({
          provider: AccountProviderEnum.GOOGLE,
          providerId,
          displayName,
          avatarUrl: picture,
          email
        });
        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      session: true
    },
    async function (email, password, done) {
      try {
        const user = await authServices.verifyUserService({ email, password });
        done(null, user);
      } catch (error: any) {
        return done(error, false, { message: error.message });
      }
    }
  )
);

passport.serializeUser((user: any, done) => done(null, user));
passport.deserializeUser((user: any, done) => done(null, user));
