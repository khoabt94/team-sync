import { Avatar, AvatarFallback, AvatarImage } from "@shared/components/ui/avatar";
import moment from "moment";
import { Loader } from "lucide-react";
import { useGetWorkspaceMembers } from "@api/hooks/use-get-workspace-members";
import { getAvatarColor, getAvatarFallbackText } from "@shared/util/avatar.util";
import { useGetWorkspaceId } from "@shared/hooks/use-get-workspaceId";

const RecentMembers = () => {
  const workspaceId = useGetWorkspaceId();
  const { data: workspaceMembers = [], isLoading: membersLoading } = useGetWorkspaceMembers({ input: { workspaceId } });

  return (
    <div className="flex flex-col pt-2">
      {membersLoading ? (
        <Loader
          className="w-8 h-8 
        animate-spin
        place-self-center flex"
        />
      ) : null}

      <ul role="list" className="space-y-3">
        {workspaceMembers.map((member) => {
          const name = member?.userId?.name || "";
          const initials = getAvatarFallbackText(name);
          const avatarColor = getAvatarColor(name);
          return (
            <li
              key={member._id}
              role="listitem"
              className="flex items-center gap-4 p-3 rounded-lg border border-gray-200 hover:bg-gray-50"
            >
              {/* Avatar */}
              <div className="flex-shrink-0">
                <Avatar className="h-9 w-9 sm:flex">
                  <AvatarImage src={member.userId.profilePicture || ""} alt="Avatar" />
                  <AvatarFallback className={avatarColor}>{initials}</AvatarFallback>
                </Avatar>
              </div>

              {/* Member Details */}
              <div className="flex flex-col">
                <p className="text-sm font-medium text-gray-900">{member.userId.name}</p>
                <p className="text-sm text-gray-500">{member.role.name}</p>
              </div>

              {/* Joined Date */}
              <div className="ml-auto text-sm text-gray-500">
                <p>Joined</p>
                <p>{member.joinedAt ? moment(member.joinedAt).format("MMM DD, YYYY") : null}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RecentMembers;
