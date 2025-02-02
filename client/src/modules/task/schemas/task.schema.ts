import { TaskPriorityEnum, TaskStatusEnum } from "@shared/constants/task.constant";
import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().trim().min(1, {
    message: "Title is required",
  }),
  description: z.string().trim(),
  projectId: z.string().trim().min(1, {
    message: "Project is required",
  }),
  status: z.enum(Object.values(TaskStatusEnum) as [keyof typeof TaskStatusEnum], {
    required_error: "Status is required",
  }),
  priority: z.enum(Object.values(TaskPriorityEnum) as [keyof typeof TaskPriorityEnum], {
    required_error: "Priority is required",
  }),
  assignedTo: z.array(z.string().trim()),
  dueDate: z.date({
    required_error: "A due date is required.",
  }),
});
