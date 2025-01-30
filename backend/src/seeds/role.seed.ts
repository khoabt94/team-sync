import 'dotenv/config';
import connectMongoDB from '@config/mongo-database.config';
import { RolePermissions } from '@constants/role-permission.constant';
import RoleModel from '@models/roles-permission.model';
import mongoose from 'mongoose';
export async function seedRoles() {
  try {
    await connectMongoDB();
    console.log('Seeding roles start...');

    const session = await mongoose.startSession();
    session.startTransaction();

    await RoleModel.deleteMany({}, { session });
    console.log('Deleted all existing roles...');

    await Promise.all(
      Object.entries(RolePermissions).map(async ([role, permissions]) => {
        const existingRole = await RoleModel.findOne({ role }).session(session);
        if (existingRole) {
          return;
        }
        const newRole = new RoleModel({ role, permission: permissions });
        await newRole.save({ session });
        console.log(`Saved permission for ${role}`);
      })
    );
    await session.commitTransaction();
    console.log('Created all seeded roles...');
    session.endSession();
  } catch (error) {
    console.log('Fail to seed roles', error);
  } finally {
    process.exit(1);
  }
}

seedRoles();
