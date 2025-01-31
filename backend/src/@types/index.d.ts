import { PermissionType } from '@enums/role.enum';
import { MemberDocument } from '@/member';
import { UserDocument } from '@/user';
import { WorkspaceDocument } from '@/workspace';

declare global {
  namespace Express {
    interface User extends Omit<UserDocument, 'password'> {
      _id?: any;
    }
  }
}

declare module 'express-serve-static-core' {
  interface Request {
    workspace?: WorkspaceDocument;
    members?: MemberDocument[];
    role?: RoleType;
    permission?: PermissionType[];
  }
}
