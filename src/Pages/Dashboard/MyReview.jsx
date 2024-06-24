import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MyReviews = () => {
  const { user } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axiosSecure.get(`/reviews/deliveryMan/${user.id}`);
        setReviews(res.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, [user.id, axiosSecure]);

  return (
    <div>
      <h2 className="text-2xl font-bold text-center underline mb-4">
        My Reviews
      </h2>
      <div className="overflow-x-auto">
        <table className="table table-auto w-full">
          <thead>
            <tr>
              <th>User Name</th>
              <th>Rating</th>
              <th>Feedback</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {reviews.length > 0 ? (
              reviews.map((review, idx) => (
                <tr key={idx}>
                  <td>{review.userName}</td>
                  <td>{review.rating}</td>
                  <td>{review.feedback}</td>
                  <td>{new Date(review.date).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  No reviews found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyReviews;
