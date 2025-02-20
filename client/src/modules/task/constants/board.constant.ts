import { defaultDropAnimationSideEffects, DropAnimation } from "@dnd-kit/core";

export const TRASH_ID = "void";
export const PLACEHOLDER_ID = "placeholder";

export const dropAnimation: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: "0.5",
      },
    },
  }),
};
