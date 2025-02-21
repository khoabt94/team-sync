import { DataTableFacetedFilter } from "@/task/components/table/table-faceted-filter";
import { TaskFilterType } from "@/task/types/filter.type";
import { useGetWorkspaceMembers } from "@api/hooks/use-get-workspace-members";
import { useGetWorkspaceProjects } from "@api/hooks/use-get-workspace-projects";
import { Avatar, AvatarFallback, AvatarImage } from "@shared/components/ui/avatar";
import { Button } from "@shared/components/ui/button";
import { Input } from "@shared/components/ui/input";

import {
  TaskPriorityConfig,
  TaskPriorityEnumType,
  TaskStatusConfig,
  TaskStatusEnumType,
} from "@shared/constants/task.constant";
import { useGetWorkspaceId } from "@shared/hooks/use-get-workspaceId";
import { getAvatarColor, getAvatarFallbackText } from "@shared/util/avatar.util";
import { ListRestart } from "lucide-react";
import { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { Tooltip, TooltipContent, TooltipTrigger } from "@shared/components/ui/tooltip";
import { DataTableProjectFilter } from "@/task/components/table/table-project-filter";

type DataTableFilterToolbarProps = {
  isLoading?: boolean;
  projectId?: string;
  onChangeFilter?: () => void;
};

export function TaskFilterToolbar({ isLoading, projectId = "", onChangeFilter }: DataTableFilterToolbarProps) {
  const filterForm = useFormContext<TaskFilterType>();
  const filters = filterForm.watch();
  const { keyword = "", assigneeId = [], priority = [], project: filterProjectId = projectId, status = [] } = filters;
  const workspaceId = useGetWorkspaceId();

  const { data: projects = [] } = useGetWorkspaceProjects({
    input: { workspaceId },
  });

  const { data: members = [] } = useGetWorkspaceMembers({
    input: { workspaceId },
  });
  const statusOptions = useMemo(() => Object.values(TaskStatusConfig), []);
  const priorityOptions = useMemo(() => Object.values(TaskPriorityConfig), []);
  //Workspace Projects
  const projectOptions = projects?.map((project) => {
    return {
      label: (
        <div className="flex items-center gap-1">
          <span>{project.emoji}</span>
          <span>{project.name}</span>
        </div>
      ),
      value: project._id,
      emoji: project.emoji!,
    };
  });

  // Workspace Memebers
  const assigneesOptions = members?.map((member) => {
    const name = member.userId?.name || "Unknown";
    const initials = getAvatarFallbackText(name);
    const avatarColor = getAvatarColor(name);

    return {
      label: (
        <div className="flex items-center space-x-2">
          <Avatar className="h-7 w-7">
            <AvatarImage src={member.userId?.profilePicture || ""} alt={name} />
            <AvatarFallback className={avatarColor}>{initials}</AvatarFallback>
          </Avatar>
          <span>{name}</span>
        </div>
      ),
      value: member.userId._id,
    };
  });
  const shouldShowResetButton = Object.entries(filters).some(([key, value]) => {
    if (key === "page" || key === "limit" || key === "sort") return false;
    if (Array.isArray(value)) return value.length !== 0;
    if (key === "keyword") return value !== "";
    return false;
  });

  return (
    <div className=" w-full ">
      <div className="flex items-center justify-between">
        <Input
          placeholder="Filter tasks..."
          value={keyword}
          onChange={(e) => {
            filterForm.setValue("keyword", e.target.value);
            onChangeFilter?.();
          }}
          className="h-8 w-full max-w-[250px]"
        />
        <div className="flex items-center gap-x-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                disabled={!shouldShowResetButton}
                variant="ghost"
                className="size-8 px-2 lg:px-3"
                onClick={() => {
                  filterForm.reset();
                  onChangeFilter?.();
                }}
              >
                <ListRestart />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Reset filters</TooltipContent>
          </Tooltip>
        </div>
      </div>
      <div className="mt-2 flex items-center gap-x-2 w-full overflow-x-auto overflow-y-hidden">
        {/* Status filter */}
        <DataTableFacetedFilter
          title="Status"
          multiSelect={true}
          options={statusOptions}
          disabled={isLoading}
          selectedValues={status}
          onFilterChange={(values) => {
            filterForm.setValue("status", values as TaskStatusEnumType[]);
            onChangeFilter?.();
          }}
        />

        {/* Priority filter */}
        <DataTableFacetedFilter
          title="Priority"
          multiSelect={true}
          options={priorityOptions}
          disabled={isLoading}
          selectedValues={priority}
          onFilterChange={(values) => {
            filterForm.setValue("priority", values as TaskPriorityEnumType[]);
            onChangeFilter?.();
          }}
        />

        {/* Assigned To filter */}
        <DataTableFacetedFilter
          title="Assigned To"
          multiSelect={true}
          options={assigneesOptions}
          disabled={isLoading}
          selectedValues={assigneeId}
          onFilterChange={(values) => {
            filterForm.setValue("assigneeId", values);
            onChangeFilter?.();
          }}
        />

        {!projectId && (
          <DataTableProjectFilter
            title="Projects"
            options={projectOptions}
            disabled={isLoading}
            selectedValue={filterProjectId}
            onFilterChange={(values) => {
              filterForm.setValue("project", values);
              onChangeFilter?.();
            }}
          />
        )}
      </div>
    </div>
  );
}
