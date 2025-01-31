import { UnauthorizedException } from '@utils/app-error.util';
import { asyncHandler } from '@utils/async-handler.util';
import { NextFunction, Request, Response } from 'express';

export const authenticatedGuard = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user || !req.user._id) { throw new UnauthorizedException('Unauthorized action. Please log in.'); }
  next();
});
