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
import { X } from "lucide-react";
import { useMemo } from "react";
import { useFormContext } from "react-hook-form";

type DataTableFilterToolbarProps = {
  isLoading?: boolean;
  projectId?: string;
};

export const TaskTableToolbar = ({ isLoading, projectId }: DataTableFilterToolbarProps) => {
  const filterForm = useFormContext<TaskFilterType>();
  const filters = filterForm.watch();
  const { keyword = "", assigneeId = [], priority = [], projectId: filterProjectId = [], status = [] } = filters;
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

  const showResetButton = Object.values(filters).some((value) => value !== null && value !== "");

  return (
    <div className="flex flex-col lg:flex-row w-full items-start space-y-2 mb-2 lg:mb-0 lg:space-x-2  lg:space-y-0">
      <Input
        placeholder="Filter tasks..."
        value={keyword}
        onChange={(e) => filterForm.setValue("keyword", e.target.value)}
        className="h-8 w-full lg:w-[250px]"
      />
      {/* Status filter */}
      <DataTableFacetedFilter
        title="Status"
        multiSelect={true}
        options={statusOptions}
        disabled={isLoading}
        selectedValues={status}
        onFilterChange={(values) => filterForm.setValue("status", values as TaskStatusEnumType[])}
      />

      {/* Priority filter */}
      <DataTableFacetedFilter
        title="Priority"
        multiSelect={true}
        options={priorityOptions}
        disabled={isLoading}
        selectedValues={priority}
        onFilterChange={(values) => filterForm.setValue("priority", values as TaskPriorityEnumType[])}
      />

      {/* Assigned To filter */}
      <DataTableFacetedFilter
        title="Assigned To"
        multiSelect={true}
        options={assigneesOptions}
        disabled={isLoading}
        selectedValues={assigneeId}
        onFilterChange={(values) => filterForm.setValue("assigneeId", values)}
      />

      {!projectId && (
        <DataTableFacetedFilter
          title="Projects"
          multiSelect={false}
          options={projectOptions}
          disabled={isLoading}
          selectedValues={filterProjectId}
          onFilterChange={(values) => filterForm.setValue("projectId", values)}
        />
      )}

      {showResetButton && (
        <Button disabled={isLoading} variant="ghost" className="h-8 px-2 lg:px-3" onClick={() => filterForm.reset()}>
          Reset
          <X />
        </Button>
      )}
    </div>
  );
};
