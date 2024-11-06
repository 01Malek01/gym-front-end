import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Layout from "./Layout";
import SignUp from "./pages/SignUp";

export default function AppRoutes() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />, //main layout with navbar and footer,
      children: [
        {
          path: "/",
          element: <LandingPage />,
        },
        {
          path: "/signup",
          element: <SignUp />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}
