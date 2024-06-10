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
          `http://localhost:5000/payments/${user.email}`
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
            <th className="py-2 px-4 border-b">Camp Name</th>
            <th className="py-2 px-4 border-b">Camp Fees</th>
            <th className="py-2 px-4 border-b">Payment Status</th>
            <th className="py-2 px-4 border-b">Confirmation Status</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment._id}>
              <td className="py-2 px-4 border-b">{payment.campName}</td>
              <td className="py-2 px-4 border-b">{payment.campFees}</td>
              <td className="py-2 px-4 border-b">{payment.paymentStatus}</td>
              <td className="py-2 px-4 border-b">
                {payment.confirmationStatus}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentHistory;
