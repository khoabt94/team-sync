import { AccountProviderEnum, AccountProviderEnumType } from '@enums/account-provider.enum';
import AccountModel from '@models/account.model';
import UserModel from '@models/user.model';
import { workspaceServices } from '@services';
import { BadRequestException } from '@utils/app-error.util';
import mongoose from 'mongoose';

type CreateNewAccountePayload = {
  provider: AccountProviderEnumType;
  providerId: string;
  displayName: string;
  avatarUrl?: string;
  email: string;
  password?: string; // if create by GOOGLE provider, will not have password
};

async function createNewUser({
  avatarUrl,
  displayName,
  email,
  provider,
  providerId,
  password
}: CreateNewAccountePayload) {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    // create a new user
    const user = new UserModel({
      name: displayName,
      email: email,
      profilePicture: avatarUrl,
      password
    });

    // create a new account
    const newAccount = new AccountModel({
      provider: provider,
      providerId: providerId,
      userId: user._id
    });
    await newAccount.save({ session });

    const newWorkspace = await workspaceServices.createNewWorkspace({
      workspaceName: 'My workspace',
      workspaceDescription: `Workspace created for ${user.name}`,
      ownerId: user._id as string
    });
    if (!newWorkspace) {
      throw new Error('Can not create a workspace');
    }
    user.currentWorkspace = newWorkspace.id;

    await user.save({ session });
    await session.commitTransaction();

    return { user: user };
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
}

async function loginAndCreateAccountWithProviderService({ email, ...payload }: CreateNewAccountePayload) {
  try {
    let user = await UserModel.findOne({ email });
    if (!user) {
      const newUser = await createNewUser({ email, ...payload });
      user = newUser.user;
    }
    if (!user) {
      throw new BadRequestException('Fail to create user');
    }
    return { user: user };
  } catch (error) {
    throw error;
  }
}

async function verifyUserService({
  email,
  password,
  provider = AccountProviderEnum.EMAIL
}: {
  email: string;
  password: string;
  provider?: AccountProviderEnumType;
}) {
  // find account
  const account = await AccountModel.findOne({ provider, providerId: email });
  if (!account) {
    throw new BadRequestException('Invalid credentials');
  }

  // find user
  const user = await UserModel.findById(account.userId).select('+password');
  if (!user) {
    throw new BadRequestException('Invalid credentials');
  }

  // compare password
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new BadRequestException('Invalid credentials');
  }

  return user.omitPassword();
}

export const authServices = { createNewUser, verifyUserService, loginAndCreateAccountWithProviderService };
