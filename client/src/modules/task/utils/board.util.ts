import { Items } from "@/task/components/board/task-board";
import { UniqueIdentifier } from "@dnd-kit/core";
import { AnimateLayoutChanges, defaultAnimateLayoutChanges } from "@dnd-kit/sortable";

export const animateLayoutChanges: AnimateLayoutChanges = (args) =>
  defaultAnimateLayoutChanges({ ...args, wasDragging: true });

export const findContainer = (id: UniqueIdentifier, items: Items) => {
  if (id in items) {
    return id;
  }

  return Object.keys(items).find((key) => items[key].some((item) => item._id === id));
};

export const getIndex = (id: UniqueIdentifier, items: Items) => {
  const container = findContainer(id, items);

  if (!container) {
    return -1;
  }

  const index = items[container].findIndex((item) => item._id === id);

  return index;
};
