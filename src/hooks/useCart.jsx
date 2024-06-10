import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useCart = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    refetch,
    data: cart = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["cart", user?.email],
    queryFn: async () => {
      if (!user?.email) {
        return [];
      }
      const res = await axiosSecure.get(`/users?userEmail=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email, // Ensure the query only runs when user.email is available
  });

  // Filter the cart items by the user's email just to be safe
  const filteredCart = cart.filter((item) => item.userEmail === user.email);

  return [filteredCart, refetch, isLoading, error]; // Return the filtered array
};

export default useCart;
