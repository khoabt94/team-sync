import React from "react";
import { Skeleton } from "@shared/components/ui/skeleton";

type TableSkeletonProps = {
  columns: number;
  rows?: number;
};

export const TableSkeleton: React.FC<TableSkeletonProps> = ({ columns, rows = 20 }) => {
  return (
    <div className="w-full bg-white rounded-lg">
      {/* Table Header Skeleton */}
      <div className="flex h-10 bg-gray-50 rounded-t-lg">
        {[...Array(columns)].map((_, index) => (
          <div key={`header-col-${index + 1}`} className="flex-1 px-4 py-2">
            <Skeleton className="h-4 w-full rounded-lg" />
          </div>
        ))}
      </div>

      {/* Table Body Skeleton */}
      <div className="divide-y divide-gray-100">
        {[...Array(rows)].map((_, rowIndex) => (
          <div key={`row-${rowIndex + 1}`} className="flex h-10">
            {[...Array(columns)].map((_, colIndex) => (
              <div key={`row-${rowIndex + 1}-col-${colIndex + 1}`} className="flex-1 px-4 py-2">
                <Skeleton className="h-4 w-full rounded-lg" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
