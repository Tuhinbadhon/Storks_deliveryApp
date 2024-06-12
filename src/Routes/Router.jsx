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
import Statistics from "../Pages/Dashboard/Statistics";
import AllParcel from "../Pages/Dashboard/AllParcel";
import AllDeliveryMan from "../Pages/Dashboard/AllDeliveryMan";
import MyDeliveryList from "../Pages/Dashboard/MyDeliveryList";
import MyReview from "../Pages/Dashboard/MyReview";
import BookAParcel from "../Pages/Dashboard/BookAParcel";
import MyParcel from "../Pages/Dashboard/MyParcel";
import MyProfile from "../Pages/Dashboard/MyProfile";
import UpdateProfile from "../Pages/Dashboard/UpdateProfile";
import UpdateParcel from "../Pages/Dashboard/UpdateParcel";
import DeliveryManRoute from "../PrivetRoutes/DeliveryManRoute";

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
        element: (
          <AdminRoute>
            <AllUsers />
          </AdminRoute>
        ),
      },
      {
        path: "statistics",
        element: (
          <AdminRoute>
            <Statistics />
          </AdminRoute>
        ),
      },
      {
        path: "allparcels",
        element: (
          <AdminRoute>
            <AllParcel />
          </AdminRoute>
        ),
      },
      {
        path: "all_delivery_men",
        element: (
          <AdminRoute>
            <AllDeliveryMan />
          </AdminRoute>
        ),
      },
      {
        path: "deliveryList",
        element: (
          <DeliveryManRoute>
            <MyDeliveryList />
          </DeliveryManRoute>
        ),
      },
      {
        path: "myReviews",
        element: (
          <DeliveryManRoute>
            <MyReview />
          </DeliveryManRoute>
        ),
      },
      {
        path: "bookAParcel",
        element: <BookAParcel />,
      },
      {
        path: "myParcels",
        element: <MyParcel />,
      },
      {
        path: "myProfile",
        element: <MyProfile />,
      },
      {
        path: "updateprofile",
        element: <UpdateProfile />,
      },
      {
        path: "updateParcel",
        element: <UpdateParcel />,
        // loader: ({ params }) =>
        //   fetch(`https://server-side-puce-alpha.vercel.app/parcels/${params.id}`),
      },
    ],
  },
]);
