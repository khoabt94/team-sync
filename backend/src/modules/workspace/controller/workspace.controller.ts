import { RoleModel } from '@/role';
import {
  changeRoleSchema,
  createWorkspaceSchema,
  inviteCodeSchema,
  updateWorkspaceSchema,
  workspaceIdSchema,
  workspaceServices
} from '@/workspace';

import { MemberModel, memberServices } from '@/member';
import { asyncHandler } from '@utils/async-handler.util';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { UserModel, userServices } from '@/user';
import { NotFoundException } from '@utils/app-error.util';

const createNewWorkspace = asyncHandler(async (req: Request, res: Response) => {
  const data = createWorkspaceSchema.parse(req.body);
  const newWorkspace = await workspaceServices.createNewWorkspace({
    ownerId: req.user?._id,
    workspaceName: data.name,
    workspaceDescription: data.description
  });

  await userServices.changeWorkspace({
    userId: req.user?._id,
    workspaceId: newWorkspace?.id
  });
  return res.status(StatusCodes.OK).json({
    workspace: newWorkspace,
    message: 'Create new workspace successfully'
  });
});

const getUserWorkspaces = asyncHandler(async (req: Request, res: Response) => {
  const workspaces = await workspaceServices.getUserWorkspaces(req.user?._id);
  return res.status(StatusCodes.OK).json({
    workspaces,
    message: 'Get user workspaces successfully'
  });
});

const getWorkspaceById = asyncHandler(async (req: Request, res: Response) => {
  return res.status(StatusCodes.OK).json({
    workspace: { ...req.workspace?.toObject(), role: req.role },
    message: 'Get workspace successfully'
  });
});

const getWorkspaceMembers = asyncHandler(async (req: Request, res: Response) => {
  const workspaceId = workspaceIdSchema.parse(req.params.workspaceId);
  const members = await memberServices.getWorkspaceMember(workspaceId);
  return res.status(StatusCodes.OK).json({
    members,
    workspaceId: req.params.workspaceId,
    message: 'Get workspace members successfully'
  });
});

const getWorkspaceRoles = asyncHandler(async (req: Request, res: Response) => {
  const roles = await RoleModel.find({}, { role: 1, _id: 1 }).lean();
  return res.status(StatusCodes.OK).json({
    roles,
    message: 'Get workspace roles successfully'
  });
});

const getWorkspaceAnalytics = asyncHandler(async (req: Request, res: Response) => {
  const workspaceId = workspaceIdSchema.parse(req.params.workspaceId);
  const analytics = await workspaceServices.getWorkspaceAnalytics(workspaceId);
  return res.status(StatusCodes.OK).json({
    analytics,
    message: 'Get workspace analytics successfully'
  });
});

const changeMemberRole = asyncHandler(async (req: Request, res: Response) => {
  const workspaceId = workspaceIdSchema.parse(req.params.workspaceId);
  const { memberId, roleId } = changeRoleSchema.parse(req.body);

  const newUser = await memberServices.changeMemberRole({ memberId, roleId, workspaceId });

  return res.status(StatusCodes.OK).json({
    member: newUser,
    message: 'Change role successfully'
  });
});

const joinWorkspace = asyncHandler(async (req: Request, res: Response) => {
  const inviteCode = inviteCodeSchema.parse(req.params.inviteCode);
  const userId = req.user?._id;

  const { role, workspaceId } = await memberServices.joinWorkspace({ inviteCode, userId });

  return res.status(StatusCodes.OK).json({
    workspaceId,
    role,
    message: 'Join workspace successfully'
  });
});

const updateWorkspace = asyncHandler(async (req: Request, res: Response) => {
  const workspaceId = workspaceIdSchema.parse(req.params.workspaceId);
  const data = updateWorkspaceSchema.parse(req.body);

  const newWorkspace = await workspaceServices.updateWorkspaceService(workspaceId, data);

  return res.status(StatusCodes.OK).json({
    workspace: newWorkspace,
    message: 'Update workspace successfully'
  });
});

const deleteWorkspace = asyncHandler(async (req: Request, res: Response) => {
  const workspaceId = workspaceIdSchema.parse(req.params.workspaceId);

  await workspaceServices.deleteWorkspaceService(workspaceId);

  const userId = req.user?._id as string;

  const user = await userServices.changeWorkspace({ userId });

  return res.status(StatusCodes.OK).json({
    currentWorkspace: user.currentWorkspace,
    message: 'Delete workspace successfully'
  });
});

export const workspaceControllers = {
  createNewWorkspace,
  getUserWorkspaces,
  getWorkspaceById,
  getWorkspaceMembers,
  getWorkspaceRoles,
  getWorkspaceAnalytics,
  changeMemberRole,
  joinWorkspace,
  updateWorkspace,
  deleteWorkspace
};
