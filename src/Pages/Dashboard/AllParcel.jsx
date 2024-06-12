import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

const AllParcel = () => {
  const axiosSecure = useAxiosSecure();
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${day}-${month}-${year}`;
  };

  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["parcels"],
    queryFn: async () => {
      const res = await axiosSecure.get("/parcels");
      return res.data;
    },
  });
  // // Filter only delivery men
  // const deliveryMen = users.filter((user) => user.role === "Delivery-Man");

  return (
    <div>
      <div className="flex justify-evenly my-4">
        <h2 className="text-3xl underline mb-5 font-semibold">
          All Parcels-{parcels.length}
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="table text-center table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>User’s Name</th>
              <th>User’s Phone No.</th>
              <th>Booking Date</th>
              <th>Requested Delivery Date</th>
              <th>Cost</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <th>{index + 1}</th>
                <td>{parcel.name}</td>
                <td>{parcel.phoneNumber}</td>
                <td>{formatDate(parcel.bookingDate)}</td>
                <td>{formatDate(parcel.requestedDeliveryDate)}</td>
                <td>{parcel.price}</td>
                <td>{parcel.status}</td>
                <td>
                  <button
                    onClick={() =>
                      openReviewModal(parcel._id, parcel.deliveryManId)
                    }
                    className="btn btn-accent"
                  >
                    Manage
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllParcel;
