import { Task } from "@/task/types/task.type";
import { Avatar, AvatarFallback, AvatarImage } from "@shared/components/ui/avatar";
import { Badge } from "@shared/components/ui/badge";
import { Button } from "@shared/components/ui/button";
import { Card } from "@shared/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@shared/components/ui/dropdown-menu";
import { TaskPriorityConfig } from "@shared/constants/task.constant";
import { getAvatarColor, getAvatarFallbackText } from "@shared/util/avatar.util";
import { cn } from "@shared/util/cn.util";
import { MoreVertical } from "lucide-react";

type TaskCardProps = {
  task: Task;
};

export function TaskCard({ task }: TaskCardProps) {
  const { priority, title, assignedTo } = task;
  return (
    <Card className="rounded-md select-none group/task-card">
      <div className="w-full flex p-2">
        <Badge
          variant={TaskPriorityConfig[priority].value}
          className="p-1 gap-1 !bg-transparent font-medium !shadow-none uppercase border-0 ml-auto"
        >
          <span>{TaskPriorityConfig[priority].label}</span>
        </Badge>
      </div>
      <h3 className="text-xl font-bold px-4">{title}</h3>

      <div className="flex justify-between items-center mt-2 p-2">
        <div className="flex items-center gap-x-2">
          <Badge
            variant="secondary"
            className="py-1 px-2 bg-blue-400/10 rounded-sm hover:bg-blue-400/20 transition-all gap-1 !shadow-none  border border-blue-400 ml-auto text-blue-400 font-semibold "
          >
            Due in 7 days
          </Badge>
          <div className="flex items-center gap-0">
            {assignedTo.map((assignee) => {
              const name = assignee?.name || "";

              const initials = getAvatarFallbackText(name);
              const avatarColor = getAvatarColor(name);

              return (
                name && (
                  <div className="flex justify-center gap-1" key={assignee._id}>
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={assignee?.profilePicture || ""} alt={name} />
                      <AvatarFallback className={cn(avatarColor, "text-[10px]")}>{initials}</AvatarFallback>
                    </Avatar>
                  </div>
                )
              );
            })}
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="size-6 p-0 ml-auto opacity-0 group-hover/task-card:opacity-25 hover:!opacity-50 transition-all"
            >
              <MoreVertical className="size-4 " />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Card>
  );
}
