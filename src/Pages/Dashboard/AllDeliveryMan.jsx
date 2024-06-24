import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

const AllDeliveryMen = () => {
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  // Filter only delivery men
  const deliveryMen = users.filter((user) => user.role === "Delivery-Man");

  // State to store delivery counts
  const [deliveryCounts, setDeliveryCounts] = useState({});

  // Function to fetch delivery count for a user
  const fetchDeliveryCount = async (userId) => {
    try {
      const res = await axiosSecure.get(`/deliveries/count?userId=${userId}`);
      setDeliveryCounts((prevCounts) => ({
        ...prevCounts,
        [userId]: res.data.count,
      }));
    } catch (error) {
      console.error("Error fetching delivery count:", error);
    }
  };

  // Fetch delivery counts on component mount and user data change
  useEffect(() => {
    const fetchDeliveryCounts = async () => {
      for (const user of deliveryMen) {
        await fetchDeliveryCount(user._id);
      }
    };

    fetchDeliveryCounts();
  }, [deliveryMen]);

  // Pagination Logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = deliveryMen.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(deliveryMen.length / usersPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const helmetContext = {};
  return (
    <div>
      <HelmetProvider context={helmetContext}>
        <Helmet>
          <title>Dashboard | All Delivery Men</title>
        </Helmet>
      </HelmetProvider>
      <div className="flex justify-evenly my-4">
        <h2 className="text-3xl underline mb-5 font-semibold">
          All DeliveryMen-{currentUsers.length}
        </h2>
      </div>
      <div className="overflow-x-auto">
        <table className="table text-center table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Delivery Man's Name</th>
              <th>Phone No.</th>
              <th>Number of parcel delivered</th>
              <th>Average review</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user, index) => (
              <tr key={user._id}>
                <th>{indexOfFirstUser + index + 1}</th>
                <td>{user.name}</td>
                <td>{user.phoneNumber}</td>
                {/* Access delivery count from state */}
                <td>{deliveryCounts[user._id] || 0}</td>
                <td>demo100</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="flex justify-center items-center mt-5 ">
        <button
          onClick={handlePreviousPage}
          className="btn text-white btn-accent"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="mx-3">
          {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          className="btn text-white btn-accent"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllDeliveryMen;
