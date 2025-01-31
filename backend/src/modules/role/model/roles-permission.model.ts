import { RolePermissions } from '@constants/role-permission.constant';
import { Permissions, PermissionType, Roles, RoleType } from '@enums/role.enum';
import mongoose, { Document, Schema } from 'mongoose';

export interface RoleDocument extends Document {
  role: RoleType;
  permissions: PermissionType[];
  createdAt: Date;
  updatedAt: Date;
}

const RoleSchema = new Schema<RoleDocument>(
  {
    role: {
      type: String,
      enums: Object.values(Roles),
      required: true,
      unique: true
    },
    permissions: {
      type: [String],
      enums: Object.values(Permissions),
      required: true,
      default: function () {
        return RolePermissions[this.role];
      }
    }
  },
  {
    timestamps: true
  }
);

export const RoleModel = mongoose.model<RoleDocument>('Role', RoleSchema);
