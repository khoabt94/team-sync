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

export const taskFilterSchema = z.object({
  status: z.array(z.enum(Object.values(TaskStatusEnum) as [keyof typeof TaskStatusEnum])).optional(),
  priority: z.array(z.enum(Object.values(TaskPriorityEnum) as [keyof typeof TaskPriorityEnum])).optional(),
  keyword: z.string().optional(),
  project: z.string().optional(),
  assigneeId: z.array(z.string()).optional(),
  page: z.number().optional().default(1),
  limit: z.number().optional().default(10),
  sort: z.string().optional().default("createdAt"),
});
