import { ErrorCodeEnum } from "@enums/error-code.enum";
import { PermissionType } from "@enums/role.enum";
import MemberModel from "@models/member.model";
import WorkspaceModel from "@models/workspace.model";
import { workspaceIdSchema } from "@schemas";
import { ForbiddenException, NotFoundException, UnauthorizedException } from "@utils/app-error.util";
import { asyncHandler } from "@utils/async-handler.util";
import { NextFunction, Request, Response } from "express";

// use in workspaceId route
export const workspaceAuthorizedGuard = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?._id;
    const workspaceId = workspaceIdSchema.parse(req.params.workspaceId);

    const workspace = await WorkspaceModel.findOne({
      _id: workspaceId,
      deleted: false,
    });
    if (!workspace) throw new NotFoundException("Workspace not found");

    const members = await MemberModel.find({
      workspaceId,
    })
      .populate("role")
      .exec();

    const myMembership = members.find((member) => member.userId.toString() === userId);

    if (!myMembership)
      throw new UnauthorizedException("You are not member of this workspace", ErrorCodeEnum.ACCESS_UNAUTHORIZED);

    req.workspace = workspace;
    req.members = members;
    req.role = myMembership?.role.role;
    req.permission = myMembership.role.permissions;
    next();
  } catch (error) {
    next(error);
  }
});

// use after isAuthorizedInWorkspace middleware
export const workspacePermissionGuard = (permission: PermissionType) =>
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.permission?.includes(permission)) {
        throw new ForbiddenException("You are not allowed to perform this action");
      }

      next();
    } catch (error) {
      next(error);
    }
  });
