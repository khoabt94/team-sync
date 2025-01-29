import { routeTree } from "@routeTree";
import { Toast } from "@shared/components/ui/toast";
import { Toaster } from "@shared/components/ui/toaster";
import { createRouter, RouterProvider } from "@tanstack/react-router";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
      <Toaster />
    </>
  );
}

export default App;
