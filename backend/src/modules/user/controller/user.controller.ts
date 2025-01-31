import { changeWorkspaceSchema, userServices } from "@/user";
import { asyncHandler } from "@utils/async-handler.util";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

const getCurrentUser = asyncHandler(async (req: Request, res: Response) => {
  const user = await userServices.fetchUserById(req.user?._id);
  return res.status(StatusCodes.OK).json({
    user,
    message: "Get user successfully",
  });
});

const changeWorkspace = asyncHandler(async (req: Request, res: Response) => {
  const data = changeWorkspaceSchema.parse(req.body);
  const user = await userServices.changeWorkspace(data);
  return res.status(StatusCodes.OK).json({
    user,
    message: "Save current workspace successfully",
  });
});

export const userControllers = {
  getCurrentUser,
  changeWorkspace,
};
