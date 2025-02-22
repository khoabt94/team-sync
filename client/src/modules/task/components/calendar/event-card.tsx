import { EventCalendar } from "@/task/types/calendar.type";
import { Task } from "@/task/types/task.type";
import { Avatar, AvatarFallback, AvatarImage } from "@shared/components/ui/avatar";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@shared/components/ui/hover-card";
import { TaskStatusEnum } from "@shared/constants/task.constant";
import { getAvatarColor, getAvatarFallbackText } from "@shared/util/avatar.util";
import { cn } from "@shared/util/cn.util";

type EventCardProps = {
  event: EventCalendar<Task>;
};

const statusColorMap: Record<string, string> = {
  [TaskStatusEnum.BACKLOG]: "border-l-gray-300",
  [TaskStatusEnum.TODO]: "border-l-[#0052CC]",
  [TaskStatusEnum.IN_PROGRESS]: "border-l-yellow-600",
  [TaskStatusEnum.IN_REVIEW]: "border-l-purple-500",
  [TaskStatusEnum.DONE]: "border-l-green-600",
};

export function EventCard({ event }: EventCardProps) {
  const {
    title,
    status,
    assignedTo,
    project: { emoji },
  } = event;
  return (
    <HoverCard openDelay={100} closeDelay={0}>
      <HoverCardTrigger asChild>
        <div className="px-1">
          <div
            className={cn(
              "p-1.5 text-xs bg-white text-primary border rounded-md border-l-4 flex flex-col gap-y-1.5 cursor-pointer hover:opacity-75 transition-all",
              statusColorMap[status],
            )}
          >
            <p className="block w-full line-clamp-1 truncate">{title}</p>
          </div>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 p-0 rounded-md shadow-sm" side="left">
        <div
          className={cn(
            "p-1.5 text-xs bg-white text-primary border rounded-md border-l-4 flex flex-col gap-y-1.5 cursor-pointer hover:opacity-75 transition-all",
            statusColorMap[status],
          )}
        >
          <p>{title}</p>
          <div className="flex items-center justify-between w-full gap-x-0">
            {assignedTo.map((assignee) => {
              const name = assignee?.name || "";

              const initials = getAvatarFallbackText(name);
              const avatarColor = getAvatarColor(name);

              return (
                name && (
                  <div className="flex justify-center gap-1" key={assignee._id}>
                    <Avatar className="h-5 w-5">
                      <AvatarImage src={assignee?.profilePicture || ""} alt={name} />
                      <AvatarFallback className={cn(avatarColor, "text-[8px]")}>{initials}</AvatarFallback>
                    </Avatar>
                  </div>
                )
              );
            })}
            <span>{emoji}</span>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
