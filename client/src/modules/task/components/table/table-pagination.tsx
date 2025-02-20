import { Table } from "@tanstack/react-table";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

import { Button } from "@shared/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@shared/components/ui/select";

type DataTablePaginationProps<TData> = {
  table: Table<TData>;
  pageNumber: number;
  pageSize: number;
  totalCount: number; // Total rows from the API
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
};

export function DataTablePagination<TData>({
  table,
  pageNumber,
  pageSize,
  totalCount,
  onPageChange,
  onPageSizeChange,
}: DataTablePaginationProps<TData>) {
  const pageIndex = table.getState().pagination.pageIndex;
  //const pageSize = table.getState().pagination.pageSize;
  const pageCount = Math.ceil(totalCount / pageSize);

  const handlePageSizeChange = (size: number) => {
    table.setPageSize(size);
    onPageSizeChange?.(size); // Trigger external handler if provided
  };

  const handlePageChange = (index: number) => {
    table.setPageIndex(index); // Update table state
    onPageChange?.(index + 1); // Trigger external handler if provided
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
      {/* Showing X to Y of Z Rows */}
      <div className="flex-1 text-sm text-muted-foreground">
        Showing {(pageNumber - 1) * pageSize + 1}-{Math.min(pageNumber * pageSize, totalCount)} of {totalCount}
      </div>
      <div className="flex items-center space-y-2 lg:space-x-8 lg:space-y-0">
        {/* Rows Per Page Selector */}

        {/* Page Info */}
        <div className="flex items-center">
          {/* Pagination Controls */}
          <div className="flex items-center gap-x-2">
            <Button
              variant="outline"
              className="size-8 p-0"
              onClick={() => handlePageChange(0)}
              disabled={pageIndex === 0}
            >
              <span className="sr-only">Go to first page</span>
              <ChevronsLeft />
            </Button>
            <Button
              variant="outline"
              className="size-8 p-0"
              onClick={() => handlePageChange(pageIndex - 1)}
              disabled={pageIndex === 0}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeft />
            </Button>
            <div className="text-sm text-muted-foreground">
              {pageIndex + 1} / {pageCount}
            </div>
            <Button
              variant="outline"
              className="size-8 p-0"
              onClick={() => handlePageChange(pageIndex + 1)}
              disabled={pageIndex >= pageCount - 1}
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRight />
            </Button>
            <Button
              variant="outline"
              className="size-8 p-0"
              onClick={() => handlePageChange(pageCount - 1)}
              disabled={pageIndex >= pageCount - 1}
            >
              <span className="sr-only">Go to last page</span>
              <ChevronsRight />
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <p className="flex-1 text-sm text-muted-foreground sr-only">Rows per page</p>
            <Select value={`${pageSize}`} onValueChange={(value) => handlePageSizeChange(Number(value))}>
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue placeholder={`${pageSize}`} />
              </SelectTrigger>
              <SelectContent side="bottom">
                {[10, 20, 30, 40, 50].map((size) => (
                  <SelectItem key={size} value={`${size}`}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}
