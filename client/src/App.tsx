import { Routes } from "@shared/components/routes";
import { Toaster } from "@shared/components/ui/toaster";
import { AuthContext, AuthProvider } from "@shared/providers/auth.provider";
import { Loader } from "lucide-react";

function App() {
  return (
    <AuthProvider>
      <AuthContext.Consumer>
        {({ isLoadingAuth }) => {
          if (isLoadingAuth) {
            return (
              <div className="flex items-center gap-x-4">
                <Loader className="animate-spin size-10" />
                <p>Team sync...</p>
              </div>
            );
          } else {
            return (
              <>
                <Routes />
                <Toaster />
              </>
            );
          }
        }}
      </AuthContext.Consumer>
    </AuthProvider>
  );
}

export default App;
