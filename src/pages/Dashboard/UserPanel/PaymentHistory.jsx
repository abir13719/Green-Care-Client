import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";

const PaymentHistory = () => {
  const { user } = useAuth();
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/payment-info/${user.email}`
        );
        setPayments(response.data);
      } catch (error) {
        console.error("Error fetching payment history", error);
      }
    };

    fetchPayments();
  }, [user.email]);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Payment History</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <td className="py-2 px-4 border-b font-bold">Camp Name</td>
            <td className="py-2 px-4 border-b font-bold">Camp Fees</td>
            <td className="py-2 px-4 border-b font-bold">Date</td>
            <td className="py-2 px-4 border-b font-bold">Transaction ID</td>
            <td className="py-2 px-4 border-b font-bold">Payment Status</td>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment._id}>
              <td className="py-2 px-4 border-b">{payment.campName}</td>
              <td className="py-2 px-4 border-b">{payment.campFees}</td>
              <td className="py-2 px-4 border-b">{payment.date}</td>
              <td className="py-2 px-4 border-b">{payment.transactionId}</td>
              <td className="py-2 px-4 border-b">{payment.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentHistory;
