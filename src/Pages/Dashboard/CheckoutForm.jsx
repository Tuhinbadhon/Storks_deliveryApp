import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import usePrice from "../../hooks/usePrice";

const CheckoutForm = () => {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { parcels, refetch, isParcelsLoading, isParcelsError } = usePrice();
  const navigate = useNavigate();

  const totalPrice = parcels.reduce((total, item) => total + item.price, 0);

  useEffect(() => {
    if (totalPrice > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: totalPrice })
        .then((res) => setClientSecret(res.data.clientSecret))
        .catch((err) =>
          setError("Failed to initialize payment. Please try again.")
        );
    }
  }, [axiosSecure, totalPrice]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      setError("Card details not found.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { error: paymentError, paymentMethod } =
        await stripe.createPaymentMethod({
          type: "card",
          card,
        });

      if (paymentError) {
        setError(paymentError.message);
        setLoading(false);
        return;
      }

      const { paymentIntent, error: confirmError } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card,
            billing_details: {
              email: user?.email || "anonymous",
              name: user?.displayName || "anonymous",
            },
          },
        });

      if (confirmError) {
        setError(confirmError.message);
        setLoading(false);
        return;
      }

      if (paymentIntent.status === "succeeded") {
        setTransactionId(paymentIntent.id);

        const payment = {
          email: user.email,
          price: totalPrice,
          transactionId: paymentIntent.id,
          date: moment().format(),
          parcelIds: parcels.map((item) => item._id),
          menuItemIds: parcels.map((item) => item.menuId),
          status: "pending",
        };

        const res = await axiosSecure.post("/payments", payment);
        refetch();

        if (res.data?.paymentResult?.insertedId) {
          Swal.fire("Success!", "Payment Completed successfully.", "success");
          navigate("/dashboard/paymentHistory");
        }
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (isParcelsLoading) {
    return <div>Loading parcels...</div>;
  }

  if (isParcelsError) {
    return <div>Error loading parcels</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button
        className="btn btn-sm btn-primary my-4"
        type="submit"
        disabled={!stripe || !clientSecret || loading}
      >
        {loading ? "Processing..." : "Pay"}
      </button>
      {error && <p className="text-red-600">{error}</p>}
      {transactionId && (
        <p className="text-green-600">Your transaction id: {transactionId}</p>
      )}
    </form>
  );
};

export default CheckoutForm;
