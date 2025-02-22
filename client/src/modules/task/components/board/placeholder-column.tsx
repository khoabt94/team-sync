import { useSortable } from "@dnd-kit/sortable";

export const PlaceholderColumn = () => {
  const { setNodeRef } = useSortable({ id: "placeholder" });
  return (
    <div className="text-gray-400 italic text-center" id="placeholder" ref={setNodeRef}>
      Drop here
    </div>
  );
};
