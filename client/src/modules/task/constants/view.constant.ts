export const ViewList = {
  Table: "Table",
  Board: "Board",
  Calendar: "Calendar",
} as const;

export type ViewListType = (typeof ViewList)[keyof typeof ViewList];
