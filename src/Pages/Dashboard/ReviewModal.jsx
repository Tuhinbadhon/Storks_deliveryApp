import React, { useContext, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthProvider";

const ReviewModal = ({ parcelId, deliveryManId, onClose }) => {
  const { user } = useContext(AuthContext);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reviewData = {
      name: user.displayName,
      image: user.photoURL,
      rating,
      feedback,
      deliveryManId,
    };

    try {
      await axios.post(`/parcels/review/${parcelId}`, reviewData);
      Swal.fire("Review Added!", "Your review has been added.", "success");
      onClose(); // Close the modal
    } catch (error) {
      Swal.fire("Error!", "There was an error adding your review.", "error");
    }
  };

  return (
    <div className="modal">
      <div className="modal-box">
        <button
          onClick={onClose}
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >
          ✕
        </button>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label className="label">User’s Name</label>
            <input
              type="text"
              value={user.displayName}
              readOnly
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">User’s Image</label>
            <img
              src={user.photoURL}
              alt="User"
              className="w-16 h-16 rounded-full"
            />
          </div>
          <div className="form-control">
            <label className="label">Rating out of 5</label>
            <input
              type="number"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              max="5"
              min="0"
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">Feedback</label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="textarea textarea-bordered"
            ></textarea>
          </div>
          <div className="form-control">
            <label className="label">Delivery Men’s Id</label>
            <input
              type="text"
              value={deliveryManId}
              readOnly
              className="input input-bordered"
            />
          </div>
          <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary">
              Submit Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;
