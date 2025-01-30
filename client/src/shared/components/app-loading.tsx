import { Loader } from "lucide-react";

export function AppLoading() {
  return (
    <div className="flex items-center justify-center w-screen h-screen gap-x-4">
      <Loader className="animate-spin size-10" />
      <p>Team sync...</p>
    </div>
  );
}
