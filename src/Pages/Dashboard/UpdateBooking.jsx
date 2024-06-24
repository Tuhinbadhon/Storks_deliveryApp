import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const UpdateBooking = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [parcel, setParcel] = useState({});
  const [formData, setFormData] = useState({});

  useEffect(() => {
    axios.get(`/parcels/${id}`).then((res) => {
      setParcel(res.data);
      setFormData(res.data);
    });
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosSecure.patch(`/parcels/update/${id}`, formData).then((res) => {
      Swal.fire("Updated!", "Your parcel booking has been updated.", "success");
    });
  };

  return (
    <div>
      <h2>Update Booking</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="parcelType"
          value={formData.parcelType || ""}
          onChange={handleChange}
        />
        <input
          type="number"
          name="parcelWeight"
          value={formData.parcelWeight || ""}
          onChange={handleChange}
        />
        <input
          type="text"
          name="receiverName"
          value={formData.receiverName || ""}
          onChange={handleChange}
        />
        <input
          type="text"
          name="receiverPhoneNumber"
          value={formData.receiverPhoneNumber || ""}
          onChange={handleChange}
        />
        <input
          type="text"
          name="parcelDeliveryAddress"
          value={formData.parcelDeliveryAddress || ""}
          onChange={handleChange}
        />
        <input
          type="date"
          name="requestedDeliveryDate"
          value={formData.requestedDeliveryDate || ""}
          onChange={handleChange}
        />
        <button type="submit">Update Booking</button>
      </form>
    </div>
  );
};

export default UpdateBooking;
