import { TaskPriorityEnum, TaskStatusEnum } from "@shared/constants/task.constant";
import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground",
        [TaskStatusEnum.BACKLOG]: "bg-gray-100 text-gray-600",
        [TaskStatusEnum.TODO]: "  bg-[#DEEBFF] text-[#0052CC]",
        [TaskStatusEnum.IN_PROGRESS]: "bg-yellow-100 text-yellow-600",
        [TaskStatusEnum.IN_REVIEW]: "bg-purple-100 text-purple-500",
        [TaskStatusEnum.DONE]: "bg-green-100 text-green-600",
        [TaskPriorityEnum.HIGH]: "bg-orange-100 text-orange-600",
        [TaskPriorityEnum.MEDIUM]: "bg-yellow-100 text-yellow-600",
        [TaskPriorityEnum.LOW]: "bg-gray-100 text-gray-600",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);
