import { MutationProps } from "@api/type";
import { axiosClient } from "@shared/util/axios.util";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { WORKSPACE_PROJECTS } from "@api/hooks/use-get-projects-in-workspace";
import { z } from "zod";
import { editProjectSchema } from "@/project/schemas/project.schema";
import { Project } from "@/project/types/project.type";
import { PROJECT_DETAIL } from "@api/hooks/use-get-project-detail";

export type UpdateProjectInput = {
  workspaceId: string;
  projectId: string;
  data: z.infer<typeof editProjectSchema>;
};

export type UpdateProjectResponse = {
  project: Project;
  message: string;
};

export type UseUpdateProjectProps = MutationProps<Project, UpdateProjectInput>;

export async function UpdateProjectFn({ workspaceId, projectId, data }: UpdateProjectInput): Promise<Project> {
  const response: UpdateProjectResponse = await axiosClient.put(
    `project/${projectId}/workspace/${workspaceId}/update`,
    data,
  );
  return response.project;
}

export function useUpdateProject(options?: UseUpdateProjectProps) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: UpdateProjectFn,
    onSuccess: async (data, variables) => {
      queryClient.setQueryData([PROJECT_DETAIL, variables.workspaceId, variables.projectId], data);
      await queryClient.invalidateQueries({ queryKey: [WORKSPACE_PROJECTS, variables.workspaceId] });
    },
    ...options,
  });

  return mutation;
}
