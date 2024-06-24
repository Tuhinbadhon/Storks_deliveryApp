import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";

const usePrice = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    data: parcels = [],
    isLoading: isParcelsLoading,
    isError: isParcelsError,
    refetch,
  } = useQuery({
    queryKey: ["parcels", user?.email],
    queryFn: async () => {
      if (!user?.email) {
        return [];
      }
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email, // Ensure the query only runs when user.email is available
  });

  return { parcels, refetch, isParcelsLoading, isParcelsError };
};

export default usePrice;
