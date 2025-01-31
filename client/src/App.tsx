import { AppLoading } from "@shared/components/app-loading";
import { Routes } from "@shared/components/routes";
import { Toaster } from "@shared/components/ui/toaster";
import { useAuth } from "@shared/hooks/use-auth";
import { useAuthStore } from "@shared/stores/auth.store";

function App() {
  const { isFetchingUser } = useAuthStore();
  useAuth();

  if (isFetchingUser) {
    return <AppLoading />;
  }

  return (
    <>
      <Routes />
      <Toaster />
    </>
  );
}

export default App;
