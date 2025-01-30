import { Roles } from '@enums/role.enum';
import MemberModel from '@models/member.model';
import RoleModel from '@models/roles-permission.model';
import WorkspaceModel from '@models/workspace.model';
import { workspaceServices } from '@services/workspace.service';
import { BadRequestException, NotFoundException } from '@utils/app-error.util';
import { ObjectId } from 'mongodb';

type GetMemberRoleServicePayload = {
  workspaceId: string;
  memberId: string;
};

async function getWorkspaceMember(workspaceId: string) {
  const members = await MemberModel.find({
    workspaceId
  })
    .populate('userId', 'name email profilePicture')
    .populate('role', 'role')
    .exec();

  return members;
}

async function getMemberRole({ workspaceId, memberId }: GetMemberRoleServicePayload) {
  const user = await MemberModel.findOne({
    workspaceId,
    userId: memberId
  });

  if (!user) {
    throw new NotFoundException('Member not found');
  }

  return user;
}

type ChangeMemberRoleServicePayload = {
  workspaceId: string;
  memberId: string;
  roleId: string;
};

async function changeMemberRole({ workspaceId, memberId, roleId }: ChangeMemberRoleServicePayload) {
  const user = await getMemberRole({ workspaceId, memberId });
  user.role = new ObjectId(roleId);

  await user.save();

  return user;
}

async function removeMember({ workspaceId, memberId }: ChangeMemberRoleServicePayload) {
  const user = await getMemberRole({ workspaceId, memberId });

  await user.deleteOne();

  return user;
}

async function addMember({ workspaceId, memberId, roleId }: ChangeMemberRoleServicePayload) {
  const workspace = await workspaceServices.getWorkspaceDetail(workspaceId);

  // check whether already member
  const isMember = await MemberModel.findOne({ workspaceId: workspace._id, userId: memberId });
  if (isMember) {
    throw new BadRequestException('This person is already a member of that workspace');
  }

  // find MEMBER role id
  const memberRole = await RoleModel.findById(roleId);
  if (!memberRole) {
    throw new NotFoundException('Role ID not found');
  }

  const newMember = new MemberModel({
    workspaceId: workspace._id,
    userId: memberId,
    role: memberRole._id
  });

  await newMember.save();

  return { workspaceId: workspace._id, role: memberRole.role };
}

type JoinWorkspaceServicePayload = {
  inviteCode: string;
  userId: string;
};

async function joinWorkspace({ inviteCode, userId }: JoinWorkspaceServicePayload) {
  // check invite code valid
  const workspace = await WorkspaceModel.findOne({ inviteCode, deleted: false });
  if (!workspace) {
    throw new NotFoundException('Invite Code is not existing');
  }

  // check whether already member
  const isMember = await MemberModel.findOne({ workspaceId: workspace._id, userId });
  if (isMember) {
    throw new BadRequestException('You are already a member of that workspace');
  }

  // find MEMBER role id
  const memberRole = await RoleModel.findOne({ role: Roles.MEMBER });
  if (!memberRole) {
    throw new NotFoundException('Member role ID not found');
  }

  const newMember = new MemberModel({
    workspaceId: workspace._id,
    userId,
    role: memberRole._id
  });

  await newMember.save();

  return { workspaceId: workspace._id, role: memberRole.role };
}

export const memberServices = {
  changeMemberRole,
  joinWorkspace,
  getMemberRole,
  removeMember,
  addMember,
  getWorkspaceMember
};
