import React from "react";
import example from "../../../assets/Screenshot 2024-06-02 191606.png";

const ManageRegisteredCamps = () => {
  return (
    <div className="bg-green-300">
      <div className="container mx-auto h-screen flex flex-col items-center justify-center">
        <h1 className="text-5xl font-bold">This will be Manage Camps</h1>
        <p className="text-center">
          On this route, display all the camps data of users who have already
          registered. Ensure that the camp details (Camp name, Camp Fees,
          Participant Name) are organized and presented in a clear table format.
          The camp information should be retrieved from the database.
          Additionally, include fields such as payment status, payment
          confirmation status, and a cancel button.
        </p>
        <p className="text-center">
          <b>Payment Status:</b> Clearly indicate whether participants have paid
          or unpaid, ensuring transparency in financial transactions.
        </p>
        <p className="text-center">
          <b>Confirmation Status:</b>Initially set to "Pending." Upon clicking
          the "Pending" button, it updates to "Confirmed" once the payment is
          successfully processed by the participant.
        </p>
        <p className="text-center">
          <b>Cancellation:</b>Organizers can easily cancel registrations with a
          friendly confirmation dialog. If payment is "Paid" and confirmation is
          "Confirmed," the cancel button will be disabled. After cancellation,
          data will be promptly removed to keep records accurate. participant.
        </p>
        <img src={example} />
      </div>
    </div>
  );
};

export default ManageRegisteredCamps;
