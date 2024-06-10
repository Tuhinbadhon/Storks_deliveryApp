import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import ErrorPage from "../Components/Error/ErrorPage";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Registration from "../Pages/Register/Registration";
import PrivateRoutes2 from "../PrivetRoutes/PrivetRoutes2";
import PrivateRoutes from "../PrivetRoutes/PrivetRoutes";
import Dashboard from "../Layouts/Dashboard";
import AdminRoute from "../PrivetRoutes/AdminRoute";
import UserHome from "../Pages/Dashboard/UserHome";
import AdminHome from "../Pages/Dashboard/AdminHome";
import AllUsers from "../Pages/Dashboard/AllUsers";

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
  {
    path: "dashboard",
    element: (
      <PrivateRoutes>
        <Dashboard />
      </PrivateRoutes>
    ),
    children: [
      {
        path: "userHome",
        element: <UserHome></UserHome>,
      },
      //admin routes
      {
        path: "adminHome",
        element: (
          <AdminRoute>
            <AdminHome></AdminHome>
          </AdminRoute>
        ),
      },
      // {
      //   path: "addItems",
      //   element: (
      //     <AdminRoute>
      //       <AddItems></AddItems>
      //     </AdminRoute>
      //   ),
      // },
      // {
      //   path: "manageItems",
      //   element: (
      //     <AdminRoute>
      //       <ManageItems></ManageItems>
      //     </AdminRoute>
      //   ),
      // },
      // {
      //   path: "updateItem/:id",
      //   element: (
      //     <AdminRoute>
      //       <UpdateItem></UpdateItem>
      //     </AdminRoute>
      //   ),
      //   loader: ({ params }) =>
      //     fetch(
      //       `https://bistro-boss-server-seven-sage.vercel.app/menu/${params.id}`
      //     ),
      // },
      {
        path: "users",
        element: <AllUsers></AllUsers>,
      },
    ],
  },
]);
