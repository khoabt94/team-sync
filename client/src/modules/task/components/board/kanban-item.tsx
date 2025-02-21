import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@shared/util/cn.util";
import { GripHorizontal } from "lucide-react";
import { PropsWithChildren } from "react";

type KanbanItemProps<T> = PropsWithChildren & {
  isDragging?: boolean;
  itemId: string;
  item?: T;
};

export function KanbanItem<T>({ children, itemId, item }: KanbanItemProps<T>) {
  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: itemId,
    data: {
      type: "Item",
      item,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn("relative group/kanban-item", {
        "opacity-50": isDragging,
      })}
      {...attributes}
      {...listeners}
    >
      <GripHorizontal
        className={cn(
          "absolute group-hover/kanban-item:opacity-15 opacity-0 hover:!opacity-50 transition-all top-1 left-1/2 cursor-grab -translate-x-1/2",
          {
            "cursor-grabbing": isDragging,
          },
        )}
      />
      {children}
    </div>
  );
}
