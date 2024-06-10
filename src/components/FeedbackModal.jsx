import React, { useState } from "react";
import Modal from "react-modal";

const FeedbackModal = ({ isOpen, onClose, onSubmit }) => {
  const [feedback, setFeedback] = useState("");

  const handleSubmit = () => {
    onSubmit(feedback);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Feedback Modal"
      className="w-full h-screen flex items-center justify-center"
    >
      <div className="bg-gray-100 p-5 border border-gray-300 rounded">
        <h2 className="text-3xl font-medium text-black my-4">
          Provide Your Feedback
        </h2>
        <textarea
          className="w-full border border-gray-300"
          rows={10}
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Enter your feedback here..."
        ></textarea>
        <button
          onClick={handleSubmit}
          className="bg-green-500 p-2 rounded mr-1"
        >
          Submit
        </button>
        <button onClick={onClose} className="bg-red-500 p-2 rounded">
          Close
        </button>
      </div>
    </Modal>
  );
};

export default FeedbackModal;
