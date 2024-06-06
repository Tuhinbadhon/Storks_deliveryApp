import React from "react";
import ReactDOM from "react-dom/client";
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import AuthProvider from "./Provider/AuthProvider.jsx";
import { ThemeProvider } from "styled-components";
import { theme } from "./Components/Theme/Theme.jsx";
import { router } from "./Routes/Router.jsx";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <div className="max-w-screen-xl mx-auto">
            <RouterProvider router={router} />
          </div>
        </ThemeProvider>
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
);
