import passport from "passport";
import { config } from "@config/app.config";
import { AccountProviderEnum } from "@enums/account-provider.enum";
import { userSchema } from "@schemas";
import { authServices } from "@services";
import { asyncHandler } from "@utils/async-handler.util";
import { NextFunction, Request, Response } from "express";
import { StatusCodes as HttpStatusCode, StatusCodes } from "http-status-codes";

const googleLoginCallback = asyncHandler(async (req: Request, res: Response) => {
  const currentWorkspace = req.user?.currentWorkspace;

  if (!currentWorkspace) {
    return res.redirect(`${config.CLIENT_GOOGLE_CALLBACK_URL}?status=failure`);
  }
  return res.redirect(`${config.CLIENT_URL}/app/workspace/${currentWorkspace}`);
});

const registerUserByEmail = asyncHandler(async (req: Request, res: Response) => {
  const data = userSchema.register.parse(req.body);

  const { user } = await authServices.createNewUser({
    provider: AccountProviderEnum.EMAIL,
    providerId: data.email,
    displayName: data.name,
    email: data.email,
    password: data.password,
  });

  return res.status(HttpStatusCode.CREATED).json({
    user,
    message: "User registered successfully",
  });
});

const emailLogin = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(
    "local",
    (error: Error | null, user: Express.User | false, info: { message: string } | undefined) => {
      if (error) {
        next(error);
      }

      if (!user) {
        return next();
      }

      req.logIn(user, () => {
        return res.status(StatusCodes.OK).json({
          message: "Login successfully",
          user,
        });
      });
    },
  )(req, res, next);
});

const logOutController = asyncHandler(async (req: Request, res: Response) => {
  req.logout((error) => {
    if (error) {
      console.error(error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        error: "Fail to log out",
      });
    }
  });

  req.session = null;
  return res.status(StatusCodes.OK).json({
    message: "Logout successfully",
  });
});

export const authControllers = {
  googleLoginCallback,
  registerUserByEmail,
  emailLogin,
  logOutController,
};
