import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AppRoutes from "./AppRoutes/AppRoutes.tsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AuthContextProvider from "./context/AuthContext.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster.tsx";
import CheckAuthProvider from "./hooks/useCheckAuth.tsx";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <CheckAuthProvider>
        <AuthContextProvider>
          <AppRoutes />
          <Toaster />
        </AuthContextProvider>
      </CheckAuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
