import { z } from "zod";
import { TaskPriorityEnum, TaskStatusEnum } from "../enums/task.enum";
import mongoose from "mongoose";

export const titleSchema = z
  .string({ message: "Please provide task title" })
  .trim()
  .min(1, { message: "Please provide task title" })
  .max(255);

export const descriptionSchema = z
  .string({ message: "Please provide task description" })
  .trim()
  .min(1, { message: "Please provide task description" })
  .max(255);

export const assignedToSchema = z.string().trim().min(1).nullable().optional();

export const prioritySchema = z
  .enum(Object.values(TaskPriorityEnum) as [string, ...string[]])
  .nullable()
  .optional();

export const statusSchema = z
  .enum(Object.values(TaskStatusEnum) as [string, ...string[]])
  .nullable()
  .optional();

export const dueDateSchema = z
  .string()
  .trim()
  .optional()
  .refine(
    (val) => {
      return !val || !isNaN(Date.parse(val));
    },
    {
      message: "Invalid date format. Please provide a valid date string.",
    }
  );

export const taskIdSchema = z.string({ message: "Task ID is required" }).refine(
  (val) => {
    return mongoose.Types.ObjectId.isValid(val);
  },
  { message: "Task ID is invalid", path: ["taskId"] }
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
  title: titleSchema,
  description: descriptionSchema,
  priority: prioritySchema,
  status: statusSchema,
  assignedTo: assignedToSchema,
  dueDate: dueDateSchema,
});
