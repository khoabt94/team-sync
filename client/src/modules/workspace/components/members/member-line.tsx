import { WorkspaceMember } from "@/workspace/types/workspace.type";
import { Avatar, AvatarFallback, AvatarImage } from "@shared/components/ui/avatar";
import { Button } from "@shared/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@shared/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@shared/components/ui/popover";
import { RoleType } from "@shared/constants/role-permission.constant";
import { Role } from "@shared/types/role.type";
import { getAvatarColor, getAvatarFallbackText } from "@shared/util/avatar.util";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

type MemberLineProps = {
  member: WorkspaceMember;
  memberRole: RoleType;
  isCanChangeRole: boolean;
  roles: Role[];
  onChangeMemberRole: (roleId: string, memberId: string) => void;
};

export function MemberLine({ member, memberRole, isCanChangeRole, roles, onChangeMemberRole }: MemberLineProps) {
  const name = member.userId?.name;
  const initials = getAvatarFallbackText(name);
  const avatarColor = getAvatarColor(name);
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center justify-between space-x-4" key={member._id}>
      <div className="flex items-center space-x-4">
        <Avatar className="h-8 w-8">
          <AvatarImage src={member.userId?.profilePicture || ""} alt="Image" />
          <AvatarFallback className={avatarColor}>{initials}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-medium leading-none">{name}</p>
          <p className="text-xs text-muted-foreground">{member.userId.email}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="ml-auto min-w-24 capitalize disabled:opacity-95 disabled:pointer-events-none"
              disabled={!isCanChangeRole}
            >
              {member.role.role?.toLowerCase()} {isCanChangeRole && <ChevronDown className="text-muted-foreground" />}
            </Button>
          </PopoverTrigger>
          {isCanChangeRole && (
            <PopoverContent className="p-0" align="end">
              <Command>
                <CommandList>
                  <CommandEmpty>No roles found.</CommandEmpty>
                  <CommandGroup>
                    {roles
                      .filter((ro) => ro.role !== memberRole)
                      .map(
                        (role) =>
                          role.role !== "OWNER" && (
                            <CommandItem
                              key={role.role}
                              className="disabled:pointer-events-none gap-1 mb-1  flex flex-col items-start px-4 py-2 cursor-pointer"
                              onSelect={() => {
                                setOpen(false);
                                onChangeMemberRole(role._id, member.userId._id);
                              }}
                            >
                              <p className="capitalize">{role.role?.toLowerCase()}</p>
                              <p className="text-sm text-muted-foreground">
                                {role.role === "ADMIN" && `Can view, create, edit tasks, project and manage settings .`}

                                {role.role === "MEMBER" && `Can view,edit only task created by.`}
                              </p>
                            </CommandItem>
                          ),
                      )}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          )}
        </Popover>
      </div>
    </div>
  );
}
