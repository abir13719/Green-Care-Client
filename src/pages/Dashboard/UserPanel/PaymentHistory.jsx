import React from "react";

const PaymentHistory = () => {
  return (
    <div className="bg-green-300">
      <div className="container mx-auto h-screen flex flex-col items-center justify-center">
        <h1 className="text-5xl font-bold">This will be Payment History</h1>
        <p className="text-center">
          Let participants easily see their camp payment history. They can check
          past and current transactions for each camp. Show details like Camp
          Name, Fees, Payment Status, and Confirmation Status in a simple table.
        </p>
      </div>
    </div>
  );
};

export default PaymentHistory;
