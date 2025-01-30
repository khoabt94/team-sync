import { comparePassword, hashPassword } from '@utils/bcrypt.util';
import { omit } from 'lodash';
import mongoose, { Document, Schema } from 'mongoose';

export interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
  profilePicture?: string;
  isActive: boolean;
  lastLogin: Date | null;
  createdAt: Date;
  updatedAt: Date;
  currentWorkspace: mongoose.Types.ObjectId | null;
  comparePassword(value: string): Promise<boolean>;
  omitPassword(): UserDocument;
}

const UserSchema = new Schema<UserDocument>(
  {
    name: {
      type: String,
      required: false,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    password: { type: String, select: false },
    profilePicture: {
      type: String,
      default: null
    },
    currentWorkspace: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Workspace'
    },
    isActive: { type: Boolean, default: true },
    lastLogin: { type: Date, default: Date.now() }
  },
  {
    timestamps: true
  }
);

UserSchema.pre('save', async function (next) {
  if (this.isModified('password') && this.password) {
    const hashedPassword = await hashPassword(this.password);
    this.password = hashedPassword;
  }
  next();
});

UserSchema.methods.comparePassword = async function (candidate: string) {
  return comparePassword(candidate, this.password);
};

UserSchema.methods.omitPassword = async function () {
  return omit(this.toObject(), 'password');
};

const UserModel = mongoose.model<UserDocument>('User', UserSchema);
export default UserModel;
