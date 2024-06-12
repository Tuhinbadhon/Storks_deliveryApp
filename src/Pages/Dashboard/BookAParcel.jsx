import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css"; // Import the Swal CSS

const BookAParcel = () => {
  const { user } = useContext(AuthContext);
  const initialFormData = {
    name: user.displayName || "",
    email: user.email || "",
    phoneNumber: "",
    parcelType: "",
    parcelWeight: 0,
    receiversName: "",
    receiversPhoneNumber: "",
    deliveryAddress: "",
    requestedDeliveryDate: "",
    latitude: "",
    longitude: "",
    price: 0,
  };

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    const calculatePrice = (weight) => {
      let price = 0;
      if (weight === 1) {
        price = 50;
      } else if (weight === 2) {
        price = 100;
      } else if (weight > 2) {
        price = 150;
      }
      return price;
    };

    setFormData((prevData) => ({
      ...prevData,
      price: calculatePrice(prevData.parcelWeight),
    }));
  }, [formData.parcelWeight]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "parcelWeight" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://server-side-puce-alpha.vercel.app/parcels",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            status: "pending", // Default status
          }),
        }
      );

      if (response.ok) {
        Swal.fire({
          text: "Parcel booked successfully!",
          icon: "success",
        });
        setFormData(initialFormData);
      } else {
        throw new Error("Failed to book parcel");
      }
    } catch (error) {
      Swal.fire({
        text: error.message,
        icon: "error",
      });
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Book a Parcel</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name:
          </label>
          <input
            type="text"
            name="name"
            disabled
            value={formData.name}
            readOnly
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email:
          </label>
          <input
            type="email"
            name="email"
            disabled
            value={formData.email}
            readOnly
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone Number:
          </label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Parcel Type:
          </label>
          <input
            type="text"
            name="parcelType"
            value={formData.parcelType}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Parcel Weight (kg):
          </label>
          <input
            type="number"
            name="parcelWeight"
            value={formData.parcelWeight}
            onChange={handleChange}
            required
            min="1"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Receiver’s Name:
          </label>
          <input
            type="text"
            name="receiversName"
            value={formData.receiversName}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Receiver's Phone Number:
          </label>
          <input
            type="text"
            name="receiversPhoneNumber"
            value={formData.receiversPhoneNumber}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Parcel Delivery Address:
          </label>
          <input
            type="text"
            name="deliveryAddress"
            value={formData.deliveryAddress}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Requested Delivery Date:
          </label>
          <input
            type="date"
            name="requestedDeliveryDate"
            value={formData.requestedDeliveryDate}
            onChange={handleChange}
            min={
              new Date(new Date().setDate(new Date().getDate() + 1))
                .toISOString()
                .split("T")[0]
            } // Setting min to tomorrow's date
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Delivery Address Latitude:
          </label>
          <input
            type="text"
            name="latitude"
            value={formData.latitude}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Delivery Address Longitude:
          </label>
          <input
            type="text"
            name="longitude"
            value={formData.longitude}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Price (Tk):
          </label>
          <input
            type="text"
            name="price"
            value={formData.price}
            readOnly
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#404345] hover:bg-success  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Book
        </button>
      </form>
    </div>
  );
};

export default BookAParcel;
