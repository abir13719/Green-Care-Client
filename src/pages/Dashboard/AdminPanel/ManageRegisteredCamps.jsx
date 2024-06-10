import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageCamps = () => {
  const [camps, setCamps] = useState([]);

  useEffect(() => {
    const fetchCamps = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/participants`);
        setCamps(response.data);
      } catch (error) {
        console.error("Error fetching camps", error);
      }
    };

    fetchCamps();
  }, []);

  const handleConfirm = async (campId) => {
    console.log(campId, "insidie men");
    try {
      await axios.patch(`http://localhost:5000/participants/${campId}`, {
        confirmationStatus: "Confirmed",
      });
      setCamps(
        camps.map((camp) =>
          camp._id === campId
            ? { ...camp, confirmationStatus: "Confirmed" }
            : camp
        )
      );
      toast.success("Confirmation successful");
    } catch (error) {
      console.error("Error confirming registration", error);
      toast.error("Error confirming registration");
    }
  };

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

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Manage Registered Camps</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <td className="py-2 px-4 border-b font-bold">Camp Name</td>
            <td className="py-2 px-4 border-b font-bold">Camp Fees</td>
            <td className="py-2 px-4 border-b font-bold">Participant Name</td>
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
              <td className="py-2 px-4 border-b">{camp.participantName}</td>
              <td className="py-2 px-4 border-b">{camp.paymentStatus}</td>
              <td className="py-2 px-4 border-b">{camp.confirmationStatus}</td>
              <td className="py-2 px-4 border-b grid gap-1">
                {camp.confirmationStatus === "Pending" && (
                  <button
                    onClick={() => handleConfirm(camp.campId)}
                    className="bg-green-500 text-white py-1 px-3 rounded"
                  >
                    Confirm
                  </button>
                )}
                <button
                  onClick={() => handleCancel(camp._id)}
                  disabled={
                    camp.paymentStatus === "Paid" &&
                    camp.confirmationStatus === "Confirmed"
                  }
                  className="bg-red-500 text-white py-1 px-3 rounded"
                >
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
};

export default ManageCamps;
