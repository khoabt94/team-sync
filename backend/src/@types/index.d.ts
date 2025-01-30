import { PermissionType } from '@enums/role.enum';
import { MemberDocument } from '@models/member.model';
import { UserDocument } from '@models/user.model';
import { WorkspaceDocument } from '@models/workspace.model';

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
