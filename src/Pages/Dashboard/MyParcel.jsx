import React, { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import ReviewModal from "./ReviewModal";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const MyParcels = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [filterStatus, setFilterStatus] = useState("");
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [currentParcelId, setCurrentParcelId] = useState(null);
  const [currentDeliveryManId, setCurrentDeliveryManId] = useState(null);
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${day}-${month}-${year}`;
  };

  const {
    data: parcels = [],
    refetch,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["parcels", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/user/${user.email}`);
      console.log(res.data);
      return res.data;
    },
    onError: (error) => {
      console.error("Error fetching parcels:", error);
      Swal.fire(
        "Error",
        "Failed to fetch parcels. Please try again later.",
        "error"
      );
    },
  });

  const handleCancel = async (parcelId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to cancel this booking?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it!",
    });
    if (result.isConfirmed) {
      try {
        await axiosSecure.patch(`/parcels/cancel/${parcelId}`);
        refetch();
        Swal.fire("Cancelled!", "Your booking has been cancelled.", "success");
      } catch (error) {
        console.error("Error cancelling booking:", error);
        Swal.fire(
          "Error",
          "Failed to cancel booking. Please try again later.",
          "error"
        );
      }
    }
  };

  const openReviewModal = (parcelId, deliveryManId) => {
    setCurrentParcelId(parcelId);
    setCurrentDeliveryManId(deliveryManId);
    setIsReviewModalOpen(true);
  };

  const filteredParcels = filterStatus
    ? parcels.filter((parcel) => parcel.status === filterStatus)
    : parcels;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading parcels: {error.message}</div>;
  }

  return (
    <div className="my-10 p-2">
      <h2 className="text-2xl font-bold text-center underline mb-4">
        My Parcels
      </h2>

      <div className="mb-4">
        <label htmlFor="statusFilter" className="mr-2">
          Filter by status:
        </label>
        <select
          id="statusFilter"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="select select-bordered"
          aria-label="Filter parcels by status"
        >
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="on the way">On the way</option>
          <option value="delivered">Delivered</option>
          <option value="returned">Returned</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-auto w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Parcel Type</th>
              <th>Requested Delivery Date</th>
              <th>Approximate Delivery Date</th>
              <th>Booking Date</th>
              <th>Delivery Man ID</th>
              <th>Booking Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredParcels.length > 0 ? (
              filteredParcels.map((parcel, idx) => (
                <tr key={parcel._id}>
                  <td>{idx + 1}</td>
                  <td>{parcel.parcelType}</td>
                  <td>{formatDate(parcel.requestedDeliveryDate)}</td>
                  <td>{parcel.approximateDeliveryDate || "Not Assigned"}</td>
                  <td>{formatDate(parcel.bookingDate)}</td>
                  <td>{parcel.deliveryManId || "Not Assigned"}</td>
                  <td>{parcel.status}</td>
                  <td className="flex flex-col gap-2">
                    <Link to={`/updateParcel`}>
                      <button
                        className="btn btn-primary"
                        disabled={parcel.status !== "pending"}
                      >
                        Update
                      </button>
                    </Link>
                    <button
                      onClick={() => handleCancel(parcel._id)}
                      className="btn btn-secondary"
                      disabled={parcel.status !== "pending"}
                    >
                      Cancel
                    </button>
                    {parcel.status === "delivered" && (
                      <button
                        onClick={() =>
                          openReviewModal(parcel._id, parcel.deliveryManId)
                        }
                        className="btn btn-accent"
                      >
                        Review
                      </button>
                    )}
                    {parcel.status === "pending" && (
                      <button className="btn btn-success">Pay</button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center">
                  No parcels found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isReviewModalOpen && (
        <ReviewModal
          parcelId={currentParcelId}
          deliveryManId={currentDeliveryManId}
          onClose={() => setIsReviewModalOpen(false)}
        />
      )}
    </div>
  );
};

export default MyParcels;
