import { userServices } from '@/user';
import { asyncHandler } from '@utils/async-handler.util';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const getCurrentUser = asyncHandler(async (req: Request, res: Response) => {
  const user = await userServices.fetchUserByIdService(req.user?._id);
  return res.status(StatusCodes.OK).json({
    user,
    message: 'Get user successfully'
  });
});

export const userControllers = {
  getCurrentUser
};
