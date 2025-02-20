import { taskFilterSchema } from "@/task/schemas/task.schema";
import { z } from "zod";

export type TaskFilterType = z.infer<typeof taskFilterSchema>;
