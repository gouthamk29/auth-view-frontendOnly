import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, redirect, RouterProvider } from "react-router";
import Login from "./pages/login.tsx";
import Register from "./pages/register.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import Dashboard from "./pages/dashboard.tsx";
import EditorPage from "./pages/EditorPage.tsx";
import ProfilePage from "./pages/profilePage.tsx";
import { ThemeProvider } from "./components/theme-provider.tsx";

function protectedLoader() {
  
  return null;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },

 
  {
    loader: protectedLoader,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: ":id/editor",
        element: <EditorPage />,
      },
      {
        path: ":userId/profile",
        element: <ProfilePage />,
      },
    ],
  },
]);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
);
