import { Loader } from "lucide-react";

import { MemberLine } from "@/workspace/components/members/member-line";
import { useWorkspaceContext } from "@/workspace/providers/workspace.provider";
import { WorkspaceMember } from "@/workspace/types/workspace.type";
import { useChangeMemberRole } from "@api/hooks/use-change-member-role";
import { WORKSPACE_MEMBERS } from "@api/hooks/use-get-workspace-members";
import { useGetWorkspaceRoles } from "@api/hooks/use-get-workspace-roles";
import { Permissions } from "@shared/constants/task.constant";
import { useGetWorkspaceId } from "@shared/hooks/use-get-workspaceId";
import { useAuthStore } from "@shared/stores/auth.store";
import { useQueryClient } from "@tanstack/react-query";
import { debounce } from "lodash";
import { useRef } from "react";
import { toast } from "@shared/hooks/use-toast";
import { useOpenDialog } from "@shared/hooks/use-open-dialog";
import { ConfirmDialog } from "@shared/components/dialogs/confirm-dialog";
import { useRemoveMember } from "@api/hooks/use-remove-member";

export const AllMembers = () => {
  const { hasPermission, membersLoading, workspaceMembers } = useWorkspaceContext();
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  const canChangeMemberRole = hasPermission(Permissions.CHANGE_MEMBER_ROLE);
  const { mutateAsync: changeMemberRole } = useChangeMemberRole();
  const workspaceId = useGetWorkspaceId();
  const { data: roles = [], isLoading: isLoadingRoles } = useGetWorkspaceRoles({ input: { workspaceId } });
  const { mutateAsync: removeMember } = useRemoveMember();
  const debounceChangeMemberRole = useRef(debounce(changeMemberRole, 300));
  const { open: openDialog } = useOpenDialog();

  const handleChangeMemberRole = async (roleId: string, memberId: string) => {
    const selectedRole = roles.find((role) => role._id === roleId);
    if (!selectedRole) return;
    queryClient.setQueryData([WORKSPACE_MEMBERS, workspaceId], (oldData: WorkspaceMember[]) => {
      return oldData.map((member) => {
        if (member.userId._id === memberId) {
          return { ...member, role: selectedRole };
        }
        return member;
      });
    });
    await debounceChangeMemberRole.current(
      { workspaceId, data: { memberId, roleId } },
      {
        onError: (error) => {
          queryClient.invalidateQueries({ queryKey: [WORKSPACE_MEMBERS, workspaceId] });
          toast({
            title: "Error",
            description: error.message ?? "Failed to change member role",
          });
        },
      },
    );
  };

  const handleRemoveMember = async (memberId: string, memberName: string) => {
    openDialog({
      id: "confirm-remove-member",
      Component: ConfirmDialog,
      modalProps: {
        onSubmit: async () => {
          await removeMember(
            { workspaceId, memberId },
            {
              onSuccess: () => {
                toast({
                  title: "Success",
                  description: `Removed "${memberName}" successfully`,
                });
              },
              onError: (error) => {
                toast({
                  title: "Error",
                  description: error.message,
                  variant: "destructive",
                });
              },
            },
          );
        },
        title: `Remove "${memberName}"`,
        description: `Are you sure you want to remove that member? This action will cause unassigning that member from related task and cannot be undone.`,
        confirmText: "Remove",
        cancelText: "Cancel",
      },
    });
  };

  return (
    <div className="grid gap-6 pt-2">
      {membersLoading || isLoadingRoles ? <Loader className="w-8 h-8 animate-spin place-self-center flex" /> : null}
      {workspaceMembers?.map((member) => {
        const isMyself = member.userId._id === user?._id;
        const isCanChangeRole = canChangeMemberRole && !isMyself;
        const myRole = roles.find((role) => role.role === member.role.role)?.role ?? "MEMBER";

        return (
          <MemberLine
            key={member._id}
            member={member}
            onChangeMemberRole={handleChangeMemberRole}
            onRemoveMember={handleRemoveMember}
            isCanChangeRole={isCanChangeRole}
            memberRole={myRole}
            roles={roles}
          />
        );
      })}
    </div>
  );
};
