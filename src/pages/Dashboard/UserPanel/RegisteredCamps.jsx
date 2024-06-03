import React from "react";
import demo from "../../../assets/Screenshot.png";

const RegisteredCamps = () => {
  return (
    <div className="bg-green-200">
      <div className="container mx-auto h-screen flex flex-col items-center justify-center">
        <h1 className="text-5xl font-bold">This will be Registered Camps</h1>
        <p className="text-center">
          On this route, display all the data, showcasing only camps registered
          by each participant. Ensure clear organization and presentation of
          camp details (Camp name, Camp Fees, Participant Name) in a table
          format. Include additional fields such as payment status, payment
          confirmation status, a feedback button, and a cancel button.
        </p>
        <p className="text-center">
          <b>Payment Status:</b>
          Show if each camp is unpaid or paid. For unpaid camps, provide a "Pay"
          button to redirect participants to payment. After successful payment
          via Stripe, display a notification with the transaction ID and update
          the "Pay" button to "Paid," disabling it.
        </p>
        <p className="text-center">
          <b>Note:</b>
          Upon successful payment, document transaction details in a dedicated
          collection for the participant's payment history
        </p>
        <p className="text-center">
          <b>Confirmation Status:</b>
          Set initially to "Pending" and automatically updated to "Confirmed"
          upon organizer approval.
        </p>
        <p className="text-center">
          <b>Cancellation:</b>
          Each camp row features a "Cancel" button for participants to revoke
          their registration. The button is active before payment but becomes
          inactive after payment. Upon cancellation, data is promptly removed
          from the database.
        </p>
        <p className="text-center">
          <b>Feedback and Ratings:</b>
          Once payment is successfully completed and confirmed by the organizer,
          the feedback button becomes visible. Participants can provide feedback
          and ratings by clicking this button, and their responses are collected
          and stored in a feedback collection. Additionally, all participant
          feedback is displayed on the home page section.
        </p>
        <img src={demo} />
      </div>
    </div>
  );
};

export default RegisteredCamps;
