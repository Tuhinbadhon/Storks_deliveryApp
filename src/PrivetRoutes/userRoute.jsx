import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const UserRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <progress className="progress w-56"></progress>;
  }

  if (user) {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} replace />;
};

export default UserRoute;
