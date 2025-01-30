export const transformStatusEnum = (status: string): string => {
  return status.replace(/_/g, " ");
};

export const formatStatusToEnum = (status: string): string => {
  return status.toUpperCase().replace(/\s+/g, "_");
};
