import { AccountProviderEnum, AccountProviderEnumType } from '@enums/account-provider.enum';
import mongoose, { Document, Schema } from 'mongoose';

export interface AccountDocument extends Document {
  provider: AccountProviderEnumType;
  providerId: string; // email or googleId
  userId: mongoose.Types.ObjectId;
  createAt: Date;
  refreshToken: string | null;
  tokenExpire: Date | null;
}

const AccountSchema = new Schema<AccountDocument>(
  {
    provider: {
      type: String,
      enum: Object.values(AccountProviderEnum),
      required: true
    },
    providerId: {
      type: String,
      required: true,
      unique: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    refreshToken: {
      type: String,
      default: null,
      select: false
    },
    tokenExpire: {
      type: Date,
      default: null,
      select: false
    }
  },
  {
    timestamps: true
  }
);

const AccountModel = mongoose.model<AccountDocument>('Account', AccountSchema);
export default AccountModel;
