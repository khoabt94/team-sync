import 'dotenv/config';
import connectMongoDB from '@config/mongo-database.config';
import { AccountModel } from '@modules/auth';
import { MemberModel } from '@modules/member';
import { UserModel } from '@modules/user';
import mongoose from 'mongoose';
import { WorkspaceModel } from '@modules/workspace';

export async function resetAccountData() {
  try {
    await connectMongoDB();
    console.log('Reset db start...');

    const session = await mongoose.startSession();
    session.startTransaction();

    await UserModel.deleteMany({}, { session });
    await AccountModel.deleteMany({}, { session });
    await MemberModel.deleteMany({}, { session });
    await WorkspaceModel.deleteMany({}, { session });
    console.log('Reset db done...');

    await session.commitTransaction();
    session.endSession();
    process.exit(1);
  } catch (error) {
    console.log('Fail to reset db', error);
  }
}

resetAccountData();
