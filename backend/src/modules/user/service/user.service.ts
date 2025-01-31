import { UserModel } from "@/user";
import { MemberModel } from "@/member";
import { workspaceServices } from "@/workspace";
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
  workspaceId?: string;
};

// create new workspace -> switch to that workspace
// delete workspace -> switch to another workspace
// delete all workspace -> create new workspace and switch to that workspace
const changeWorkspace = async ({ userId, workspaceId }: ChangeWorkspacePayload) => {
  const user = await UserModel.findById(userId);
  if (!user) {
    throw new NotFoundException("User not found");
  }
  if (!workspaceId) {
    // for the case delete current workspace and switch to random workspace
    let currentWorkspace: any = await MemberModel.findOne({ userId, deletedWorkspace: false });
    let currentWorkspaceId;
    if (!currentWorkspace) {
      currentWorkspace = await workspaceServices.createNewWorkspace({
        ownerId: userId,
        workspaceName: "My workspace",
      });
      currentWorkspaceId = currentWorkspace._id;
    } else {
      currentWorkspaceId = currentWorkspace.workspaceId;
    }

    user.currentWorkspace = currentWorkspaceId;
  } else {
    await workspaceServices.getWorkspaceDetail(workspaceId);
    user.currentWorkspace = new ObjectId(workspaceId);
  }
  await user.save();

  return user;
};

export const userServices = { fetchUserById, changeWorkspace };
