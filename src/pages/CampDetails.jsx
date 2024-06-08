import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import RegistrationModal from "../components/RegistrationModal";

const CampDetails = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const [camp, setCamp] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchCampDetails = async () => {
      const response = await axios.get(`http://localhost:5000/camps/${id}`);
      setCamp(response.data);
    };
    fetchCampDetails();
  }, [id]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-gray-900 min-h-screen py-6 text-white">
      <div className="container mx-auto pt-24 px-4 md:px-6 lg:px-8">
        {camp ? (
          <div>
            <img
              src={camp.campImage}
              alt={camp.campName}
              className="w-full h-fit md:h-[550px] object-contain md:object-cover rounded mb-4"
            />
            <h2 className="text-3xl font-semibold mb-4">{camp.campName}</h2>
            <p className="mb-4">{camp.description}</p>
            <p className="mb-4">Fees: ${camp.campFees}</p>
            <p className="mb-4">Location: {camp.location}</p>
            <p className="mb-4">Date: {camp.dateTime.split("T")[0]}</p>
            <p className="mb-4">
              Healthcare Professional: {camp.healthcareProfessionalName}
            </p>
            <button
              onClick={openModal}
              className="bg-green-500 text-black px-4 py-2 rounded"
            >
              Join Camp
            </button>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      {camp && (
        <RegistrationModal
          isOpen={isModalOpen}
          onClose={closeModal}
          camp={camp}
          user={user}
        ></RegistrationModal>
      )}
    </div>
  );
};

export default CampDetails;
