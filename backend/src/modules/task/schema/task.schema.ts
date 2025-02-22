import { z } from "zod";
import mongoose from "mongoose";
import { TaskPriorityEnum, TaskStatusEnum } from "@enums/task.enum";

const titleSchema = z
  .string({ message: "Please provide task title" })
  .trim()
  .min(1, { message: "Please provide task title" })
  .max(255);

export const descriptionSchema = z
  .string({ message: "Please provide task description" })
  .trim()
  .min(1, { message: "Please provide task description" });

const assignedToSchema = z.array(z.string().trim()).nullable().optional();

export const prioritySchema = z
  .enum(Object.values(TaskPriorityEnum) as [string, ...string[]])
  .nullable()
  .optional();

const statusSchema = z
  .enum(Object.values(TaskStatusEnum) as [string, ...string[]])
  .nullable()
  .optional();

const dueDateSchema = z
  .string()
  .trim()
  .optional()
  .refine(
    (val) => {
      return !val || !isNaN(Date.parse(val));
    },
    {
      message: "Invalid date format. Please provide a valid date string.",
    },
  );

export const taskIdSchema = z.string({ message: "Task ID is required" }).refine(
  (val) => {
    return mongoose.Types.ObjectId.isValid(val);
  },
  { message: "Task ID is invalid", path: ["taskId"] },
);

export const createTaskSchema = z.object({
  title: titleSchema,
  description: descriptionSchema,
  priority: prioritySchema,
  status: statusSchema,
  assignedTo: assignedToSchema,
  dueDate: dueDateSchema,
});

export const updateTaskSchema = z.object({
  title: z.string().trim().max(255).optional(),
  description: z.string().trim().optional(),
  priority: prioritySchema,
  status: statusSchema,
  assignedTo: assignedToSchema,
  dueDate: dueDateSchema,
});

export const bulkUpdateTasksSchema = z.object({
  tasks: z.array(
    z.object({
      id: taskIdSchema,
      title: z.string().trim().max(255).optional(),
      description: z.string().trim().optional(),
      priority: prioritySchema,
      status: statusSchema,
      assignedTo: assignedToSchema,
      dueDate: dueDateSchema,
    }),
  ),
});

export const getTasksSchema = z.object({
  status: z.array(z.string().trim()).optional(),
  priority: z.array(z.string().trim()).optional(),
  assignedTo: z.array(z.string().trim()).optional(),
  dueDate: z.string().trim().optional(),
  sort: z.string().trim().optional(),
  project: z.string().trim().optional(),
  page: z.string().trim().optional(),
  limit: z.string().trim().optional(),
});
