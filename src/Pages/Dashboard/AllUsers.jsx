import { FaTrashAlt, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

const AllUsers = () => {
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

  const handleMakeAdmin = (user) => {
    axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        refetch();
        toast.success(`${user.name} is an Admin Now!`);
      }
    });
  };
  const handleMakeDeliveryMan = (user) => {
    axiosSecure.patch(`/users/deliveryMan/${user._id}`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        refetch();
        toast.success(`${user.name} is an Delivery Man Now!`);
      }
    });
  };

  // const handleDeleteUser = (user) => {
  //   Swal.fire({
  //     title: "Are you sure?",
  //     text: "You won't be able to revert this!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes, delete it!",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       axiosSecure.delete(`/users/${user._id}`).then((res) => {
  //         if (res.data.deletedCount > 0) {
  //           refetch();
  //           Swal.fire({
  //             title: "Deleted!",
  //             text: "Your file has been deleted.",
  //             icon: "success",
  //           });
  //         }
  //       });
  //     }
  //   });
  // };

  // Pagination Logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(users.length / usersPerPage);

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

  return (
    <div>
      <div className="flex justify-evenly my-4">
        <h2 className="text-3xl underline mb-5 font-semibold">
          All Users-{users.length}
        </h2>
      </div>
      <div className="overflow-x-auto">
        <table className="table text-center table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>User's Name</th>
              <th>Phone No.</th>
              <th>No. Of Parcel Booked</th>
              <th>Total Spent Amount</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user, index) => (
              <tr key={user._id}>
                <th>{indexOfFirstUser + index + 1}</th>
                <td>{user.name}</td>
                <td>00000</td>
                <td>0000</td>
                <td>demo100</td>
                <td>
                  {user.role === "Delivery-Man" ? (
                    <h2 className="font-bold text-green-500">Delivery Man</h2>
                  ) : (
                    <button
                      onClick={() => handleMakeDeliveryMan(user)}
                      className="text-white btn rounded-3xl bg-green-400"
                    >
                      Make Delivery Man
                    </button>
                  )}
                </td>

                <td>
                  {user.role === "admin" ? (
                    <h2 className="font-bold text-red-400">Admin</h2>
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      className="text-white btn rounded-3xl bg-red-400"
                    >
                      Make Admin
                    </button>
                  )}
                </td>
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

export default AllUsers;
