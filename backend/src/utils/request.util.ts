import { projectIdSchema } from '@modules/project';
import { taskIdSchema } from '@modules/task';
import { workspaceIdSchema } from '@modules/workspace';
import { Request } from 'express';

export const parseParamsId = (req: Request) => {
  const result: Record<string, string> = {};
  if (req.params.taskId) {
    result.taskId = taskIdSchema.parse(req.params.taskId);
  }
  if (req.params.workspaceId) {
    result.workspaceId = workspaceIdSchema.parse(req.params.workspaceId);
  }
  if (req.params.projectId) {
    result.projectId = projectIdSchema.parse(req.params.projectId);
  }

  return result;
};
