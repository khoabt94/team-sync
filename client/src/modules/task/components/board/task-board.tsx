import { KanbanColumn } from "@/task/components/board/kanban-column";
import { TaskCard } from "@/task/components/board/task-card";
import { Task } from "@/task/types/task.type";
import { findContainer } from "@/task/utils/board.util";
import { coordinateGetter } from "@/task/utils/coordinate-getter.util";
import {
  closestCenter,
  CollisionDetection,
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  getFirstCollision,
  KeyboardSensor,
  MeasuringStrategy,
  MouseSensor,
  pointerWithin,
  rectIntersection,
  TouchSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { TaskStatusConfig, TaskStatusEnumType } from "@shared/constants/task.constant";
import { Dictionary } from "lodash";
import { Loader } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

type TaskBoardProps = {
  projectId?: string;
  onChangeFilter?: () => void;
  isLoadingTasks?: boolean;
  totalCount?: number;
  tasks: Task[];
  columns: UniqueIdentifier[];
  onItemsChange?: (items: Task[]) => void;
};

export type Items = Dictionary<Task[]>;

export function TaskBoard({
  tasks: initialTask,
  columns: initialColumns,
  onItemsChange,
  isLoadingTasks,
}: TaskBoardProps) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const columns = useMemo(() => Object.values(initialColumns), []);
  const [items, setItems] = useState<Items>(() => {
    const grouped: Items = {};
    Object.values(initialColumns).forEach((column) => {
      grouped[column] = [];
    });
    initialTask.forEach((task) => {
      if (!grouped[task.columnId!]) {
        grouped[task.columnId!] = [];
      }
      grouped[task.columnId!].push(task);
      return grouped;
    });
    return grouped;
  });
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const lastOverId = useRef<UniqueIdentifier | null>(null);
  const recentlyMovedToNewContainer = useRef(false);
  const [clonedItems, setClonedItems] = useState<Items | null>(null);

  const collisionDetectionStrategy: CollisionDetection = useCallback(
    (args) => {
      // Start by finding any intersecting droppable
      const pointerIntersections = pointerWithin(args);
      const intersections =
        pointerIntersections.length > 0
          ? // If there are droppables intersecting with the pointer, return those
            pointerIntersections
          : rectIntersection(args);
      let overId = getFirstCollision(intersections, "id");

      if (overId != null) {
        if (overId in items) {
          const containerItems = items[overId] ?? [];

          // If a container is matched and it contains items (columns 'A', 'B', 'C')
          if (containerItems.length > 0) {
            // Return the closest droppable within that container
            overId = closestCenter({
              ...args,
              droppableContainers: args.droppableContainers.filter(
                (container) => container.id !== overId && containerItems.some((item) => item._id === container.id),
              ),
            })[0]?.id;
          }
        }

        lastOverId.current = overId;

        return [{ id: overId }];
      }

      // When a draggable item moves to a new container, the layout may shift
      // and the `overId` may become `null`. We manually set the cached `lastOverId`
      // to the id of the draggable item that was moved to the new container, otherwise
      // the previous `overId` will be returned which can cause items to incorrectly shift positions
      if (recentlyMovedToNewContainer.current) {
        lastOverId.current = activeTask?._id as UniqueIdentifier | null;
      }

      // If no droppable is matched, return the last match
      return lastOverId.current ? [{ id: lastOverId.current }] : [];
    },
    [activeTask?._id, items],
  );

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter,
    }),
  );

  const onDragCancel = () => {
    if (clonedItems) {
      setItems(clonedItems);
    }

    setActiveTask(null);
    setClonedItems(null);
  };

  const onDragStart = ({ active }: DragStartEvent) => {
    setActiveTask(active.data.current?.item);
    setClonedItems(items);
  };

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    const isActiveAColumn = active.id in items;
    if (isActiveAColumn) return;

    const activeContainer = findContainer(active.id, items);

    if (!activeContainer) {
      setActiveTask(null);
      return;
    }

    const overId = over?.id;

    if (overId == null) {
      setActiveTask(null);
      return;
    }

    const overContainer = findContainer(overId, items);
    if (overContainer) {
      const activeIndex = items[activeContainer].findIndex((item) => item._id === active.id);
      const overIndex = items[overContainer].findIndex((item) => item._id === overId);
      setItems((prev) => {
        const newItemsOverContainer = arrayMove(items[overContainer], activeIndex, overIndex).map((item, index) => ({
          ...item,
          boardView: { index },
        }));
        onItemsChange?.(newItemsOverContainer);
        return {
          ...prev,
          [overContainer]: newItemsOverContainer,
        };
      });
    }

    setActiveTask(null);
  };

  const onDragOver = ({ active, over }: DragOverEvent) => {
    const overId = over?.id;
    const activeId = active.id;

    if (overId == null) {
      return;
    }

    const overContainer = findContainer(overId, items);
    const activeContainer = findContainer(active.id, items);
    if (
      !overContainer ||
      !activeContainer ||
      activeContainer === overContainer ||
      recentlyMovedToNewContainer.current
    ) {
      return;
    }

    setItems((items) => {
      const activeItems = items[activeContainer];
      const overItems = items[overContainer];
      const overIndex = overItems.findIndex((item) => item._id === overId);
      const activeIndex = activeItems.findIndex((item) => item._id === activeId);

      let newIndex: number;

      const isOverAColumn = overId in items;

      if (isOverAColumn) {
        newIndex = overItems.length + 1;
      } else {
        const isBelowOverItem =
          over &&
          active.rect.current.translated &&
          active.rect.current.translated.top > over.rect.top + over.rect.height;

        const modifier = isBelowOverItem ? 1 : 0;

        newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
      }

      recentlyMovedToNewContainer.current = true;

      const newItemsActiveContainer = items[activeContainer]
        .filter((item) => item._id !== active.id)
        .map((item, index) => ({ ...item, boardView: { index } }));

      const newItemsOverContainer = [
        ...items[overContainer].slice(0, newIndex),
        items[activeContainer][activeIndex],
        ...items[overContainer].slice(newIndex, items[overContainer].length),
      ].map((item, index) => ({ ...item, boardView: { index }, columnId: overContainer as string }));

      return {
        ...items,
        [activeContainer]: newItemsActiveContainer,
        [overContainer]: newItemsOverContainer,
      };
    });
  };

  useEffect(() => {
    requestAnimationFrame(() => {
      recentlyMovedToNewContainer.current = false;
    });
  }, [items]);

  return (
    <DndContext
      sensors={sensors}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
      onDragCancel={onDragCancel}
      collisionDetection={collisionDetectionStrategy}
      measuring={{
        droppable: {
          strategy: MeasuringStrategy.Always,
        },
      }}
    >
      <div className="w-full overflow-x-auto flex h-full min-h-[300px] gap-4 p-4 relative">
        {isLoadingTasks && (
          <div className="w-full h-full bg-white bg-opacity-80 absolute inset-0 z-50 flex items-center justify-center">
            <Loader className="animate-spin" />
          </div>
        )}
        <SortableContext items={columns}>
          {columns.map((column) => (
            <KanbanColumn
              key={column}
              columnTitle={TaskStatusConfig[column as TaskStatusEnumType].label}
              tasks={items[column] ?? []}
              columnId={column}
            />
          ))}
        </SortableContext>

        {createPortal(<DragOverlay>{activeTask && <TaskCard task={activeTask} />}</DragOverlay>, document.body)}
      </div>
    </DndContext>
  );
}
