import { cn } from "@shared/util/cn.util";
import { Loader } from "lucide-react";

type AppLoadingProps = {
  className?: string;
};

export function AppLoading({ className }: AppLoadingProps) {
  return (
    <div className={cn("flex items-center justify-center w-screen h-screen gap-x-4", className)}>
      <Loader className="animate-spin size-10" />
      <p>Team sync...</p>
    </div>
  );
}
