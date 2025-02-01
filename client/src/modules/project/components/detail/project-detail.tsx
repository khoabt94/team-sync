import { ProjectHeader } from "@/project/components/detail/project-header";
import { Separator } from "@shared/components/ui/separator";

export function ProjectDetail() {
  return (
    <div className="w-full space-y-6 py-4 md:pt-3">
      <ProjectHeader />
      <div className="space-y-5">
        {/* <ProjectAnalytics /> */}
        <Separator />
        {/* {Task Table} */}
        {/* <TaskTable /> */}
      </div>
    </div>
  );
}
