import React from "react";
import Modal from "react-modal";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { toast } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";
import { useAuth } from "../contexts/AuthContext";

const stripePromise = loadStripe(
  "pk_test_51PMOxXRom0dhw37t0b3wKYN80KJ4fBedYhGtAWWNbrUgvIDeV3nATbbYYKnG7MdCzjnxVHrNrQ8ayOYGYx5CmAHG00WJUwz0RW"
);

const PaymentForm = ({ onRequestClose, campId, email }) => {
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();

  console.log(campId);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      const {
        data: { clientSecret },
      } = await axios.post("http://localhost:5000/create-payment-intent", {
        campId,
        email,
      });

      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: { email },
        },
      });

      if (paymentResult.error) {
        toast.error(paymentResult.error.message);
      } else {
        if (paymentResult.paymentIntent.status === "succeeded") {
          console.log(paymentResult);

          const campData = await axios.get(
            `http://localhost:5000/camps/${campId}`
          );

          const paymentInfo = {
            campName: campData.data.campName,
            campFees: paymentResult.paymentIntent.amount / 100,
            transactionId: paymentResult.paymentIntent.id,
            status: paymentResult.paymentIntent.status,
            date: new Date().toLocaleDateString(),
            campId,
            email: user.email,
          };

          console.log(paymentInfo);

          await axios.post("http://localhost:5000/payment-info", paymentInfo);

          await axios.patch(`http://localhost:5000/participants/${campId}`, {
            paymentStatus: "Paid",
          });
          toast.success("Payment successful");
          onRequestClose();
        }
      }
    } catch (error) {
      console.error("Payment error", error);
      toast.error("Payment failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-gray-900 border border-gray-300 shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <h2 className="text-3xl font-medium mb-4 text-white">Complete Payment</h2>
      <CardElement
        className="border border-gray-300 bg-white text-black py-4"
        options={{
          iconStyle: "solid",
          style: {
            base: {
              iconColor: "#000000",
              fontSize: "16px",
              color: "#000000",
              "::placeholder": {
                color: "#000000",
              },
            },
            invalid: {
              color: "#9e2146",
              iconColor: "#000000",
            },
          },
        }}
      ></CardElement>

      <p className="text-xs text-white my-4">
        We accept Visa, Mastercard, American Express, and Discover
      </p>
      <div className="flex justify-between">
        <button
          type="submit"
          className="bg-green-500 text-black py-2 px-4 rounded hover:bg-black hover:text-white"
        >
          Confirm Payment
        </button>
        <button
          type="button"
          onClick={onRequestClose}
          className="bg-red-500 text-black py-2 px-4 rounded hover:bg-black hover:text-white"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

const PaymentModal = ({ isOpen, onRequestClose, campId, email }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Payment Modal"
      className="w-full h-screen border border-red-500 flex items-center justify-center"
    >
      <Elements stripe={stripePromise}>
        <PaymentForm
          onRequestClose={onRequestClose}
          campId={campId}
          email={email}
        />
      </Elements>
    </Modal>
  );
};

export default PaymentModal;
