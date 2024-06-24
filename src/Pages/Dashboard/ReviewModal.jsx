import React, { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ReviewModal = ({
  parcelId,
  deliveryManId,
  onClose,
  userName,
  userImage,
}) => {
  const axiosSecure = useAxiosSecure();
  const [formData, setFormData] = useState({
    rating: 0,
    feedback: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosSecure.post("/reviews", {
        ...formData,
        userId: user._id,
        parcelId,
        deliveryManId,
      });
      console.log(response.data);
      Swal.fire("Success!", "Your review has been submitted.", "success");
      onClose(); // Close modal after successful submission
    } catch (error) {
      console.error("Error submitting review:", error);
      Swal.fire(
        "Error",
        "Failed to submit review. Please try again later.",
        "error"
      );
    }
  };

  return (
    <div className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Write a Review</h3>
        <form onSubmit={handleSubmit}>
          <div className="my-2">
            <label>User's Name</label>
            <input
              type="text"
              name="userName"
              value={userName}
              className="input input-bordered"
              disabled
            />
          </div>
          <div className="my-2">
            <label>User's Image</label>
            <input
              type="text"
              name="userImage"
              value={userImage}
              className="input input-bordered"
              disabled
            />
          </div>
          <div className="my-2">
            <label>Rating out of 5</label>
            <input
              type="number"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              className="input input-bordered"
              min="0"
              max="5"
              required
            />
          </div>
          <div className="my-2">
            <label>Feedback</label>
            <textarea
              name="feedback"
              value={formData.feedback}
              onChange={handleChange}
              className="textarea textarea-bordered"
              rows="4"
              required
            ></textarea>
          </div>
          <div className="modal-action">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            <button type="button" className="btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;
