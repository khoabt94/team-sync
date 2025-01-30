import { router } from "@router";
import { Toaster } from "@shared/components/ui/toaster";
import { useAuth } from "@shared/hooks/use-auth";
import { RouterProvider } from "@tanstack/react-router";

function App() {
  const authentication = useAuth();
  return (
    <>
      <RouterProvider router={router} context={{ authentication }}></RouterProvider>
      <Toaster />
    </>
  );
}

export default App;
