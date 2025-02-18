import { Column, ColumnDef, Row } from "@tanstack/react-table";

import { Checkbox } from "@shared/components/ui/checkbox";
import { Badge } from "@shared/components/ui/badge";

import { Avatar, AvatarFallback, AvatarImage } from "@shared/components/ui/avatar";
import { DataTableColumnHeader } from "@/task/components/table/table-column-header";
import { Task } from "@/task/types/task.type";
import moment from "moment";
import { DataTableRowActions } from "@/task/components/table/table-row-actions";
import {
  TaskPriorityConfig,
  TaskPriorityEnumType,
  TaskStatusConfig,
  TaskStatusEnumType,
} from "@shared/constants/task.constant";
import { getAvatarColor, getAvatarFallbackText } from "@shared/util/avatar.util";

export const getColumns = (projectId?: string): ColumnDef<Task>[] => {
  const columns: ColumnDef<Task>[] = [
    {
      id: "_id",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-[2px]"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-[2px]"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "title",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Title" />,
      cell: ({ row }) => {
        return (
          <div className="flex flex-wrap space-x-2">
            <Badge variant="outline" className="capitalize shrink-0 h-[25px]">
              {row.original.taskCode}
            </Badge>
            <span className="block lg:max-w-[220px] max-w-[200px] font-medium">{row.original.title}</span>
          </div>
        );
      },
    },
    ...(projectId
      ? [] // If projectId exists, exclude the "Project" column
      : [
          {
            accessorKey: "project",
            header: ({ column }: { column: Column<Task, unknown> }) => (
              <DataTableColumnHeader column={column} title="Project" />
            ),
            cell: ({ row }: { row: Row<Task> }) => {
              const project = row.original.project;

              if (!project) {
                return null;
              }

              return (
                <div className="flex items-center gap-1">
                  <span className="rounded-full border">{project.emoji}</span>
                  <span className="block capitalize truncate w-[100px] text-ellipsis">{project.name}</span>
                </div>
              );
            },
          },
        ]),
    {
      accessorKey: "assignedTo",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Assigned To" />,
      cell: ({ row }) => {
        const assignees = row.original.assignedTo || null;

        return assignees.map((assignee) => {
          const name = assignee?.name || "";

          const initials = getAvatarFallbackText(name);
          const avatarColor = getAvatarColor(name);

          return (
            name && (
              <div className="flex items-center gap-1" key={assignee._id}>
                <Avatar className="h-6 w-6">
                  <AvatarImage src={assignee?.profilePicture || ""} alt={name} />
                  <AvatarFallback className={avatarColor}>{initials}</AvatarFallback>
                </Avatar>
                <span className="block text-ellipsis w-[100px] truncate">{assignee?.name}</span>
              </div>
            )
          );
        });
      },
    },
    {
      accessorKey: "dueDate",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Due Date" />,
      cell: ({ row }) => {
        return (
          <span className="lg:max-w-[100px] text-sm">
            {row.original.dueDate ? moment(row.original.dueDate).format("MMM DD, YYYY") : null}
          </span>
        );
      },
    },
    {
      accessorKey: "status",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
      cell: ({ row }) => {
        const status = Object.values(TaskStatusConfig).find((status) => status.value === row.getValue("status"));

        if (!status) {
          return null;
        }

        return (
          <div className="flex lg:w-[120px] items-center">
            <Badge
              variant={status.value as TaskStatusEnumType}
              className="flex w-auto p-1 px-2 gap-1 font-medium shadow-sm uppercase border-0"
            >
              <span>{status.label}</span>
            </Badge>
          </div>
        );
      },
    },
    {
      accessorKey: "priority",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Priority" />,
      cell: ({ row }) => {
        const priority = Object.values(TaskPriorityConfig).find(
          (priority) => priority.value === row.getValue("priority"),
        );

        if (!priority) {
          return null;
        }

        return (
          <div className="flex items-center">
            <Badge
              variant={priority.value as TaskPriorityEnumType}
              className="flex lg:w-[110px] p-1 gap-1 !bg-transparent font-medium !shadow-none uppercase border-0"
            >
              <span>{priority.label}</span>
            </Badge>
          </div>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        return (
          <>
            <DataTableRowActions row={row} />
          </>
        );
      },
    },
  ];

  return columns;
};
