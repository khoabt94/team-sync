import { PermissionType } from '@enums/role.enum';
import { MemberDocument } from '@modules/member';
import { UserDocument } from '@modules/user';
import { WorkspaceDocument } from '@modules/workspace';

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
