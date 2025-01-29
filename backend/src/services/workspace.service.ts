import { Roles } from "@enums/role.enum";
import { TaskStatusEnum } from "@enums/task.enum";
import MemberModel from "@models/member.model";
import RoleModel from "@models/roles-permission.model";
import TaskModel from "@models/task.model";
import UserModel from "@models/user.model";
import WorkspaceModel, { WorkspaceDocument } from "@models/workspace.model";
import { BadRequestException, NotFoundException } from "@utils/app-error.util";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";
import { assign } from "lodash";

type CreateNewWorkspacePayload = {
  workspaceName: string;
  workspaceDescription?: string;
  ownerId: string;
};

async function createNewWorkspace({
  workspaceName,
  workspaceDescription,
  ownerId,
}: CreateNewWorkspacePayload): Promise<WorkspaceDocument | null> {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const newWorkspace = new WorkspaceModel({
      name: workspaceName,
      description: workspaceDescription ?? workspaceName,
      owner: ownerId,
    });

    await newWorkspace.save({ session });

    // add user as OWNER of workspace
    // find owner role
    const ownerRole = await RoleModel.findOne({ role: Roles.OWNER }).session(session);
    if (!ownerRole) throw new NotFoundException("Owner role not found");

    // create member in workspace
    const member = new MemberModel({
      userId: ownerId,
      role: ownerRole._id,
      workspaceId: newWorkspace._id,
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
    if (!user) throw new NotFoundException("User not found");
    if (!workspaceId) {
      user.currentWorkspace = null;
    } else {
      const workspace = await WorkspaceModel.findOne({
        _id: workspaceId,
        deleted: false,
      });
      if (!workspace) throw new NotFoundException("Workspace not found");

      user.currentWorkspace = workspace.id;
    }
    await user.save();
  } catch (error) {
    throw error;
  }
}

//User must be a member in that workspace
async function getUserWorkspaces(userId: string) {
  const memberships = await MemberModel.find({
    userId,
  })
    .populate("workspaceId")
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
    status: { $ne: TaskStatusEnum.DONE },
  });
  const completeTasks = await TaskModel.countDocuments({
    workspace: workspaceId,
    status: TaskStatusEnum.DONE,
  });
  return { totalTasks, overdueTasks, completeTasks };
}

type ChangeMemberRoleServicePayload = {
  workspaceId: string;
  memberId: string;
  roleId: string;
};

async function changeMemberRoleService({ workspaceId, memberId, roleId }: ChangeMemberRoleServicePayload) {
  const user = await MemberModel.findOneAndUpdate(
    {
      workspaceId,
      userId: memberId,
    },
    {
      role: new ObjectId(roleId),
    },
    { returnDocument: "after" }
  );

  return user;
}

type JoinWorkspaceServicePayload = {
  inviteCode: string;
  userId: string;
};

async function joinWorkspaceService({ inviteCode, userId }: JoinWorkspaceServicePayload) {
  // check invite code valid
  const workspace = await WorkspaceModel.findOne({ inviteCode, deleted: false });
  if (!workspace) throw new NotFoundException("Invite Code is not existing");

  // check whether already member
  const isMember = await MemberModel.findOne({ workspaceId: workspace._id, userId });
  if (isMember) throw new BadRequestException("You are already a member of that workspace");

  // find MEMBER role id
  const memberRole = await RoleModel.findOne({ role: Roles.MEMBER });
  if (!memberRole) throw new NotFoundException("Member role ID not found");

  const newMember = new MemberModel({
    workspaceId: workspace._id,
    userId,
    role: memberRole._id,
  });

  await newMember.save();

  return { workspaceId: workspace._id, role: memberRole.role };
}

async function updateWorkspaceService(
  workspaceId: string,
  data: Partial<Pick<WorkspaceDocument, "name" | "description">>
) {
  let workspace = await WorkspaceModel.findOne({
    _id: workspaceId,
    deleted: false,
  });

  if (!workspace) throw new NotFoundException("Workspace not found");
  workspace = assign(workspace, data);

  await workspace.save();

  return workspace;
}

async function deleteWorkspaceService(workspaceId: string) {
  let workspace = await WorkspaceModel.findOne({
    _id: workspaceId,
    deleted: false,
  });

  if (!workspace) throw new NotFoundException("Workspace not found");
  workspace.deleted = true;

  await workspace.save();

  return workspace;
}

export const workspaceServices = {
  createNewWorkspace,
  updateUserCurrentWorkspace,
  getUserWorkspaces,
  changeMemberRoleService,
  getWorkspaceAnalytics,
  joinWorkspaceService,
  updateWorkspaceService,
  deleteWorkspaceService,
};
