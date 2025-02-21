import { KanbanItem } from "@/task/components/board/kanban-item";
import { TaskCard } from "@/task/components/board/task-card";
import { Task } from "@/task/types/task.type";
import { SortableContext } from "@dnd-kit/sortable";
import { DropdownMenuContent } from "@radix-ui/react-dropdown-menu";
import { Button } from "@shared/components/ui/button";
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger } from "@shared/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

type KanbanColumnProps = {
  columnTitle: string;
  tasks: Task[];
};

export function KanbanColumn({ columnTitle, tasks }: KanbanColumnProps) {
  return (
    <div className="flex w-80 flex-none flex-col rounded-lg bg-gray-100">
      <div className="flex items-center justify-between p-2">
        <h3 className="font-semibold">{columnTitle}</h3>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">More options</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex flex-col gap-2 p-2">
        <SortableContext items={tasks.map((task) => task._id)}>
          {tasks.map((task) => (
            <KanbanItem key={task._id} itemId={task._id} item={task}>
              <TaskCard task={task} />
            </KanbanItem>
          ))}
        </SortableContext>
      </div>
    </div>
  );
}
