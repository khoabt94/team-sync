import UserModel from "@models/user.model";
import { NotFoundException, UnauthorizedException } from "@utils/app-error.util";

const fetchUserByIdService = async (userId: string) => {
  if (!userId) throw new UnauthorizedException("Unauthorized action");
  const user = await UserModel.findById(userId);
  if (!user) throw new NotFoundException("User not found");
  return user;
};

export const userServices = { fetchUserByIdService };
