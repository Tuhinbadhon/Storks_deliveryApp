import React, { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import "react-toastify/dist/ReactToastify.css";
import { Helmet, HelmetProvider } from "react-helmet-async";

const AllParcel = () => {
  const axiosSecure = useAxiosSecure();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${day}-${month}-${year}`;
  };

  const [currentParcelId, setCurrentParcelId] = useState(null);
  const [selectedDeliveryManId, setSelectedDeliveryManId] = useState("");
  const [selectedDeliveryDate, setSelectedDeliveryDate] = useState("");

  const {
    data: parcels = [],
    isLoading: isParcelsLoading,
    isError: isParcelsError,
    refetch,
  } = useQuery({
    queryKey: ["parcels"],
    queryFn: async () => {
      const res = await axiosSecure.get("/parcels");
      return res.data;
    },
  });

  const {
    data: users = [],
    isLoading: isUsersLoading,
    isError: isUsersError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  if (isParcelsLoading || isUsersLoading) {
    return <div>Loading...</div>;
  }

  if (isParcelsError || isUsersError) {
    return (
      <div>
        Error loading parcels or users:{" "}
        {isParcelsError?.message || isUsersError?.message}
      </div>
    );
  }

  const deliveryMen = users.filter((user) => user.role === "Delivery-Man");

  const handleOpenManageModal = (parcelId) => {
    setCurrentParcelId(parcelId);
    document.getElementById("my_modal_5").showModal();
  };

  const handleAssignDeliveryMan = async () => {
    if (!selectedDeliveryManId || !selectedDeliveryDate) {
      return Swal.fire(
        "Missing Information",
        "Please select a delivery man and delivery date.",
        "warning"
      );
    }

    try {
      const res = await axiosSecure.patch(
        `/parcels/assign/${currentParcelId}`,
        {
          deliveryManId: selectedDeliveryManId,
          approximateDeliveryDate: selectedDeliveryDate,
          status: "On The Way",
        }
      );

      if (res.status === 200) {
        refetch();
        document.getElementById("my_modal_5").close();
        Swal.fire("Success!", "Delivery man assigned successfully.", "success");
      } else {
        console.error("Unexpected response status:", res.status);
        Swal.fire(
          "Error",
          "Failed to assign delivery man. Please try again.",
          "error"
        );
      }
    } catch (error) {
      console.error("Error assigning delivery man:", error);
      Swal.fire(
        "Error",
        "Failed to assign delivery man. Please try again.",
        "error"
      );
    }
  };
  const helmetContext = {};
  return (
    <div>
      <HelmetProvider context={helmetContext}>
        <Helmet>
          <title>Dashboard | All Parcels</title>
        </Helmet>
      </HelmetProvider>
      <div className="flex justify-evenly my-4">
        <h2 className="text-3xl underline mb-5 font-semibold">
          All Parcels - {parcels.length}
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
                <td>{parcel.bookingDate}</td>
                <td>{formatDate(parcel.requestedDeliveryDate)}</td>
                <td>{parcel.price}</td>
                <td>{parcel.status}</td>
                <td>
                  <button
                    onClick={() => handleOpenManageModal(parcel._id)}
                    className="btn btn-primary btn-sm"
                  >
                    Manage
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Manage Modal */}
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Assign Delivery Man</h3>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Delivery Man</span>
            </label>
            <select
              value={selectedDeliveryManId}
              onChange={(e) => setSelectedDeliveryManId(e.target.value)}
              className="select select-bordered w-full"
            >
              <option value="">Select Delivery Man</option>
              {deliveryMen.map((deliveryMan) => (
                <option key={deliveryMan._id} value={deliveryMan._id}>
                  {deliveryMan.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-control mt-2">
            <label className="label">
              <span className="label-text">Approximate Delivery Date</span>
            </label>
            <input
              type="date"
              value={selectedDeliveryDate}
              onChange={(e) => setSelectedDeliveryDate(e.target.value)}
              className="input input-bordered w-full"
              min={
                new Date(new Date().setDate(new Date().getDate() + 1))
                  .toISOString()
                  .split("T")[0]
              }
            />
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
            <button
              onClick={handleAssignDeliveryMan}
              className="btn btn-primary"
            >
              Assign
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AllParcel;
