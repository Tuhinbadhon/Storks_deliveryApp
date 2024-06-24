import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Helmet, HelmetProvider } from "react-helmet-async";
import MapModal from "./MapModal";

const MyDeliveryList = () => {
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
  const [showMap, setShowMap] = useState(false);
  const [mapCoordinates, setMapCoordinates] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [filteredParcels, setFilteredParcels] = useState([]);

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

  useEffect(() => {
    if (parcels.length > 0) {
      const user = parcels[0].deliveryManId;
      setFilteredParcels(
        parcels.filter((parcel) => parcel.deliveryManId === user)
      );
    }
  }, [parcels]);

  if (isParcelsLoading) {
    return <div>Loading...</div>;
  }

  if (isParcelsError) {
    return <div>Error loading parcels: {isParcelsError?.message}</div>;
  }

  const handleOpenManageModal = (parcelId) => {
    setCurrentParcelId(parcelId);
    document.getElementById("my_modal_5").showModal();
  };

  const handleViewLocation = (latitude, longitude) => {
    setMapCoordinates({ latitude, longitude });
    setShowMap(true);
  };

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
        // setFilteredParcels((prevParcels) =>
        //   prevParcels.filter((parcel) => parcel._id !== parcelId)
        // );
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

  const handleDeliver = async (parcelId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to mark this delivery as Delivered?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, deliver it!",
    });
    if (result.isConfirmed) {
      try {
        await axiosSecure.patch(`/parcels/deliver/${parcelId}`);
        refetch();
        Swal.fire("Delivered!", "The parcel has been delivered.", "success");
      } catch (error) {
        console.error("Error marking delivery as delivered:", error);
        Swal.fire(
          "Error",
          "Failed to mark delivery as delivered. Please try again later.",
          "error"
        );
      }
    }
  };

  const helmetContext = {};

  return (
    <div>
      <HelmetProvider context={helmetContext}>
        <Helmet>
          <title>Dashboard | My Delivery List</title>
        </Helmet>
      </HelmetProvider>
      <div className="flex justify-evenly my-4">
        <h2 className="text-3xl underline mb-5 font-semibold">
          My Delivery List - {filteredParcels.length}
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="table text-center table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Booked User's Name</th>
              <th>Receiver's Name</th>
              <th>Booked User's Phone</th>
              <th>Requested Delivery Date</th>
              <th>Approximate Delivery Date</th>
              <th>Receiver's Phone Number</th>
              <th>Receiver's Address</th>
              <th>View location</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredParcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <th>{index + 1}</th>
                <td>{parcel.name}</td>
                <td>{parcel.receiversName}</td>
                <td>{parcel.phoneNumber}</td>
                <td>{formatDate(parcel.requestedDeliveryDate)}</td>
                <td>{formatDate(parcel.approximateDeliveryDate)}</td>
                <td>{parcel.receiversPhoneNumber}</td>
                <td>{parcel.deliveryAddress}</td>
                <td>
                  <button
                    onClick={() =>
                      handleViewLocation(parcel.latitude, parcel.longitude)
                    }
                    className="btn btn-secondary btn-sm ml-2"
                  >
                    View Location
                  </button>
                </td>
                <td className="flex flex-col gap-2">
                  <button
                    onClick={() => handleCancel(parcel._id)}
                    className="btn btn-primary btn-sm"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleDeliver(parcel._id)}
                    className="btn btn-secondary btn-sm "
                  >
                    Deliver
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showMap && (
        <MapModal
          latitude={mapCoordinates.latitude}
          longitude={mapCoordinates.longitude}
          onClose={() => setShowMap(false)}
        />
      )}
    </div>
  );
};

export default MyDeliveryList;
