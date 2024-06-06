import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import ErrorPage from "../Components/Error/ErrorPage";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Registration from "../Pages/Register/Registration";
import PrivateRoutes2 from "../PrivetRoutes/PrivetRoutes2";
import PrivateRoutes from "../PrivetRoutes/PrivetRoutes";
// import Dashboard from "../Layouts/Dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/registration",
        element: (
          <PrivateRoutes2>
            <Registration />
          </PrivateRoutes2>
        ),
      },
    ],
  },
  // {
  //   path: "dashboard",
  //   element: (
  //     <PrivateRoutes>
  //       <Dashboard />
  //     </PrivateRoutes>
  //   ),
  //   children: [{}],
  // },
]);
