import { WorkspaceMember } from "@/workspace/types/workspace.type";
import { PermissionType } from "@shared/constants/task.constant";
import { User } from "@shared/types/user.type";
import { useEffect, useState } from "react";

export const usePermissions = (user: User | null, members: WorkspaceMember[]) => {
  const [permissions, setPermissions] = useState<PermissionType[]>([]);

  useEffect(() => {
    if (user) {
      const myMembership = members.find((member) => member.userId._id === user._id);
      if (myMembership) {
        setPermissions(myMembership.role.permissions);
      }
    }
  }, [user, members]);

  return permissions;
};
