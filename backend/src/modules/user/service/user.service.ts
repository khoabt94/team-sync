import { UserModel } from "@/user";
import { workspaceServices } from "@modules/workspace";
import { NotFoundException, UnauthorizedException } from "@utils/app-error.util";
import { ObjectId } from "mongodb";

const fetchUserById = async (userId: string) => {
  if (!userId) {
    throw new UnauthorizedException("Unauthorized action");
  }
  const user = await UserModel.findById(userId);
  if (!user) {
    throw new NotFoundException("User not found");
  }
  return user;
};

type ChangeWorkspacePayload = {
  userId: string;
  workspaceId: string;
};

const changeWorkspace = async ({ userId, workspaceId }: ChangeWorkspacePayload) => {
  const user = await UserModel.findById(userId);
  if (!user) {
    throw new NotFoundException("User not found");
  }
  await workspaceServices.getWorkspaceDetail(workspaceId);
  user.currentWorkspace = new ObjectId(workspaceId);
  await user.save();

  return user;
};

export const userServices = { fetchUserById, changeWorkspace };
