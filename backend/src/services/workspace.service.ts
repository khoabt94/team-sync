import { Roles } from '@enums/role.enum';
import { TaskStatusEnum } from '@enums/task.enum';
import { MemberModel } from '@modules/member';
import { RoleModel } from '@modules/role';
import { TaskModel } from '@modules/task';
import { UserModel } from '@modules/user';
import { WorkspaceDocument, WorkspaceModel } from '@modules/workspace';
import { NotFoundException } from '@utils/app-error.util';
import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';
import { assign } from 'lodash';

type CreateNewWorkspacePayload = {
  workspaceName: string;
  workspaceDescription?: string;
  ownerId: string;
};

async function createNewWorkspace({
  workspaceName,
  workspaceDescription,
  ownerId
}: CreateNewWorkspacePayload): Promise<WorkspaceDocument | null> {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const newWorkspace = new WorkspaceModel({
      name: workspaceName,
      description: workspaceDescription ?? workspaceName,
      owner: ownerId
    });

    await newWorkspace.save({ session });

    // add user as OWNER of workspace
    // find owner role
    const ownerRole = await RoleModel.findOne({ role: Roles.OWNER }).session(session);
    if (!ownerRole) {
      throw new NotFoundException('Owner role not found');
    }

    // create member in workspace
    const member = new MemberModel({
      userId: ownerId,
      role: ownerRole._id,
      workspaceId: newWorkspace._id
    });
    await member.save({ session });

    await session.commitTransaction();

    return newWorkspace;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
}

type UpdateUserCurrentWorkspacePayload = {
  workspaceId: string | null;
  ownerId: string;
};

async function updateUserCurrentWorkspace({ workspaceId, ownerId }: UpdateUserCurrentWorkspacePayload): Promise<void> {
  try {
    const user = await UserModel.findById(ownerId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (!workspaceId) {
      user.currentWorkspace = null;
    } else {
      const workspace = await getWorkspaceDetail(workspaceId);

      user.currentWorkspace = workspace.id;
    }
    await user.save();
  } catch (error) {
    throw error;
  }
}

// User must be a member in that workspace
async function getUserWorkspaces(userId: string) {
  const memberships = await MemberModel.find({
    userId
  })
    .populate('workspaceId')
    .exec();

  return memberships
    .map((member) => member.workspaceId as unknown as WorkspaceDocument)
    .filter((workspace) => workspace && !workspace.deleted);
}

async function getWorkspaceAnalytics(workspaceId: string) {
  const currentDate = new Date();
  const totalTasks = await TaskModel.countDocuments({ workspace: workspaceId });
  const overdueTasks = await TaskModel.countDocuments({
    workspace: workspaceId,
    dueDate: { $lt: currentDate },
    status: { $ne: TaskStatusEnum.DONE }
  });
  const completeTasks = await TaskModel.countDocuments({
    workspace: workspaceId,
    status: TaskStatusEnum.DONE
  });
  return { totalTasks, overdueTasks, completeTasks };
}

async function getWorkspaceDetail(workspaceId: string) {
  const workspace = await WorkspaceModel.findOne({
    _id: workspaceId,
    deleted: false
  }).exec();

  if (!workspace) {
    throw new NotFoundException('Workspace not found');
  }

  return workspace;
}

async function updateWorkspaceService(
  workspaceId: string,
  data: Partial<Pick<WorkspaceDocument, 'name' | 'description'>>
) {
  let workspace = await getWorkspaceDetail(workspaceId);

  workspace = assign(workspace, data);

  await workspace.save();

  return workspace;
}

async function deleteWorkspaceService(workspaceId: string) {
  const workspace = await getWorkspaceDetail(workspaceId);

  await workspace.save();

  return workspace;
}

export const workspaceServices = {
  createNewWorkspace,
  updateUserCurrentWorkspace,
  getUserWorkspaces,
  getWorkspaceAnalytics,
  updateWorkspaceService,
  deleteWorkspaceService,
  getWorkspaceDetail
};
