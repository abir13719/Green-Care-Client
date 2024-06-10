import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../../contexts/AuthContext";
import Modal from "react-modal";
import PaymentModal from "../../../components/PaymentModal";
Modal.setAppElement("#root");

const RegisteredCamps = () => {
  const { user } = useAuth();
  const [camps, setCamps] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedCamp, setSelectedCamp] = useState(null);

  useEffect(() => {
    const fetchCamps = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/participants/${user.email}`
        );
        setCamps(response.data);
      } catch (error) {
        console.error("Error fetching registered camps", error);
      }
    };

    fetchCamps();
  }, [user.email]);
  console.log(camps);

  const handleCancel = async (campId) => {
    try {
      await axios.delete(`http://localhost:5000/participants/${campId}`);
      setCamps(camps.filter((camp) => camp._id !== campId));
      toast.success("Registration cancelled successfully");
    } catch (error) {
      console.error("Error cancelling registration", error);
      toast.error("Error cancelling registration");
    }
  };

  const handleFeedback = async (campId, feedback) => {
    try {
      await axios.post(`http://localhost:5000/feedback`, {
        campId,
        email: user.email,
        feedback,
      });
      toast.success("Feedback submitted successfully");
    } catch (error) {
      console.error("Error submitting feedback", error);
      toast.error("Error submitting feedback");
    }
  };
  console.log(selectedCamp);
  const openModal = (camp) => {
    setSelectedCamp(camp);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedCamp(null);
    setModalIsOpen(false);
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Registered Camps</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <td className="py-2 px-4 border-b font-bold">Camp Name</td>
            <td className="py-2 px-4 border-b font-bold">Camp Fees</td>
            <td className="py-2 px-4 border-b font-bold">Payment Status</td>
            <td className="py-2 px-4 border-b font-bold">
              Confirmation Status
            </td>
            <td className="py-2 px-4 border-b font-bold">Actions</td>
          </tr>
        </thead>
        <tbody>
          {camps.map((camp) => (
            <tr key={camp._id}>
              <td className="py-2 px-4 border-b">{camp.campName}</td>
              <td className="py-2 px-4 border-b">{camp.campFees}</td>
              <td className="py-2 px-4 border-b">{camp.paymentStatus}</td>
              <td className="py-2 px-4 border-b">{camp.confirmationStatus}</td>
              <td className="py-2 px-4 border-b grid gap-1">
                {camp.paymentStatus === "Unpaid" && (
                  <button
                    onClick={() => openModal(camp)}
                    className="bg-green-500 text-white py-1 px-3 rounded"
                  >
                    Pay
                  </button>
                )}
                {camp.paymentStatus === "Paid" && (
                  <button
                    disabled
                    className="bg-gray-300 text-white py-1 px-3 rounded cursor-not-allowed"
                  >
                    Paid
                  </button>
                )}

                {camp.paymentStatus !== "Paid" ? (
                  <button
                    onClick={() => handleCancel(camp._id)}
                    disabled={camp.paymentStatus === "Paid"}
                    className="bg-red-500 text-white py-1 px-3 rounded"
                  >
                    Cancel
                  </button>
                ) : (
                  <button
                    onClick={() =>
                      handleFeedback(
                        camp._id,
                        prompt("Please provide your feedback")
                      )
                    }
                    className="bg-green-500 text-white py-1 px-3 rounded"
                  >
                    Feedback
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <PaymentModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        campId={selectedCamp ? selectedCamp.campId : null}
        email={user.email}
      />
      <ToastContainer />
    </div>
  );
};

export default RegisteredCamps;
