import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../Provider/AuthProvider";

const MyReviews = () => {
  const { user } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const result = await axios.get(`/reviews/deliveryMan/${user.id}`);
      setReviews(result.data);
    };
    fetchReviews();
  }, [user.id]);

  return (
    <div>
      <h2>My Reviews</h2>
      <div className="reviews">
        {reviews.map((review, index) => (
          <div key={index} className="review-card">
            <p>
              <strong>{review.name}</strong>
            </p>
            <img
              src={review.image}
              alt="User"
              className="w-16 h-16 rounded-full"
            />
            <p>Rating: {review.rating}/5</p>
            <p>{review.feedback}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyReviews;
