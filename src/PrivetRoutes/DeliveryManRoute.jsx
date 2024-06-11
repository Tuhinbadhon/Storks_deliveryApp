import { Navigate, useLocation } from "react-router-dom";

import useDeliveryMan from "../hooks/useDeliveryMan";
import useAuth from "../hooks/useAuth";

const DeliveryManRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [isDeliveryMan, isDeliveryManLoading] = useDeliveryMan();
  const location = useLocation();

  if (loading || isDeliveryManLoading) {
    return <progress className="progress w-56"></progress>;
  }

  if (user && isDeliveryMan) {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

export default DeliveryManRoute;
