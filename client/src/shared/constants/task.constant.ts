export const TaskStatusEnum = {
  BACKLOG: "BACKLOG",
  TODO: "TODO",
  IN_PROGRESS: "IN_PROGRESS",
  IN_REVIEW: "IN_REVIEW",
  DONE: "DONE",
} as const;

export type TaskStatusEnumType = keyof typeof TaskStatusEnum;

export const TaskStatusConfig: Record<
  TaskStatusEnumType,
  {
    label: string;
    value: TaskStatusEnumType;
  }
> = {
  [TaskStatusEnum.BACKLOG]: {
    label: "BACKLOG",
    value: TaskStatusEnum.BACKLOG,
  },
  [TaskStatusEnum.TODO]: {
    label: "TODO",
    value: TaskStatusEnum.TODO,
  },
  [TaskStatusEnum.IN_PROGRESS]: {
    label: "IN PROGRESS",
    value: TaskStatusEnum.IN_PROGRESS,
  },
  [TaskStatusEnum.IN_REVIEW]: {
    label: "IN REVIEW",
    value: TaskStatusEnum.IN_REVIEW,
  },
  [TaskStatusEnum.DONE]: {
    label: "DONE",
    value: TaskStatusEnum.DONE,
  },
};

export const TaskPriorityEnum = {
  LOW: "LOW",
  MEDIUM: "MEDIUM",
  HIGH: "HIGH",
} as const;
export type TaskPriorityEnumType = keyof typeof TaskPriorityEnum;

export const TaskPriorityConfig: Record<
  TaskPriorityEnumType,
  {
    label: string;
    value: TaskPriorityEnumType;
  }
> = {
  [TaskPriorityEnum.HIGH]: {
    label: "HIGH",
    value: TaskPriorityEnum.HIGH,
  },
  [TaskPriorityEnum.MEDIUM]: {
    label: "MEDIUM",
    value: TaskPriorityEnum.MEDIUM,
  },
  [TaskPriorityEnum.LOW]: {
    label: "LOW",
    value: TaskPriorityEnum.LOW,
  },
};

export const Permissions = {
  CREATE_WORKSPACE: "CREATE_WORKSPACE",
  DELETE_WORKSPACE: "DELETE_WORKSPACE",
  EDIT_WORKSPACE: "EDIT_WORKSPACE",
  MANAGE_WORKSPACE_SETTINGS: "MANAGE_WORKSPACE_SETTINGS",
  ADD_MEMBER: "ADD_MEMBER",
  CHANGE_MEMBER_ROLE: "CHANGE_MEMBER_ROLE",
  REMOVE_MEMBER: "REMOVE_MEMBER",
  CREATE_PROJECT: "CREATE_PROJECT",
  EDIT_PROJECT: "EDIT_PROJECT",
  DELETE_PROJECT: "DELETE_PROJECT",
  CREATE_TASK: "CREATE_TASK",
  EDIT_TASK: "EDIT_TASK",
  DELETE_TASK: "DELETE_TASK",
  VIEW_ONLY: "VIEW_ONLY",
} as const;

export type PermissionType = keyof typeof Permissions;
