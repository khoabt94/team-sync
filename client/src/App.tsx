import { Routes } from "@shared/components/routes";
import { Toaster } from "@shared/components/ui/toaster";
import { useAuth } from "@shared/hooks/use-auth";
import { useAuthStore } from "@shared/stores/auth.store";
import { Loader } from "lucide-react";

function App() {
  const { isFetchingUser } = useAuthStore();
  useAuth();

  if (isFetchingUser) {
    return (
      <div className="flex items-center gap-x-4">
        <Loader className="animate-spin size-10" />
        <p>Team sync...</p>
      </div>
    );
  }

  return (
    <>
      <Routes />
      <Toaster />
    </>
  );
}

export default App;
