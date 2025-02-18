import { MutationProps } from "@api/type";
import { axiosClient } from "@shared/util/axios.util";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { projectFormSchema } from "@/project/schemas/project.schema";
import { WORKSPACE_PROJECTS } from "@api/hooks/use-get-workspace-projects";
import { Project } from "@/project/types/project.type";

export type CreateProjectInput = {
  workspaceId: string;
  data: z.infer<typeof projectFormSchema>;
};

export type CreateProjectResponse = {
  project: Project;
  message: string;
};

export type UseCreateProjectProps = MutationProps<Project, CreateProjectInput>;

export async function CreateProjectFn({ workspaceId, data }: CreateProjectInput): Promise<Project> {
  const response: CreateProjectResponse = await axiosClient.post(`/project/workspace/${workspaceId}/create`, data);
  return response.project;
}

export function useCreateProject(options?: UseCreateProjectProps) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: CreateProjectFn,
    onSuccess: async (_data, variables) => {
      await queryClient.invalidateQueries({ queryKey: [WORKSPACE_PROJECTS, variables.workspaceId] });
    },
    ...options,
  });

  return mutation;
}
