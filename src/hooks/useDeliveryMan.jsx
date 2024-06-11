import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useDeliveryMan = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: isDeliveryMan,
    isLoading: isDeliveryManLoading,
    error,
  } = useQuery({
    queryKey: [user?.email, "Delivery-Man"],
    queryFn: async () => {
      if (!user?.email) {
        return false; // If user email is not available, return false
      }
      try {
        const res = await axiosSecure.get(`/users/deliveryMan/${user.email}`);
        console.log(res.data);
        return res.data?.deliveryMan;
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

  return [isDeliveryMan, isDeliveryManLoading];
};

export default useDeliveryMan;
