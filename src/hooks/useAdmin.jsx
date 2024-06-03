import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useAdmin = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: isAdmin,
    isLoading: isAdminLoading,
    error,
  } = useQuery({
    queryKey: [user?.email, "isAdmin"],
    queryFn: async () => {
      if (!user?.email) {
        return false; // If user email is not available, return false
      }
      try {
        const res = await axiosSecure.get(`/users/admin/${user.email}`);
        return res.data?.admin;
      } catch (error) {
        console.error("Error fetching admin status:", error);
        throw error;
      }
    },
    enabled: !!user?.email, // Enable the query only if user.email is available
  });

  if (error) {
    console.error("Error fetching admin status:", error);
  }

  return [isAdmin, isAdminLoading];
};

export default useAdmin;
