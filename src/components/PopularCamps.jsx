import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const PopularCamps = () => {
  const [camps, setCamps] = useState([]);

  useEffect(() => {
    const fetchPopularCamps = async () => {
      try {
        const response = await axios.get("http://localhost:5000/popular");
        setCamps(response.data);
      } catch (error) {
        console.error("Error fetching popular camps", error);
      }
    };

    fetchPopularCamps();
  }, []);
  console.log(camps);

  if (!camps.length) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold my-6 text-center">
        Popular Medical Camps
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {camps.map((camp) => (
          <div
            key={camp._id}
            className="bg-gray-100 border border-gray-300 p-4 rounded-lg shadow-md"
          >
            <img
              src={camp.campImage}
              alt={camp.campName}
              className="w-full h-48 object-cover border border-gray-300 rounded-md mb-4"
            />
            <h3 className="text-2xl font-semibold mb-2">{camp.campName}</h3>
            <p className="text-gray-700 mb-1">Fees: ${camp.campFees}</p>
            <p className="text-gray-700 mb-1">
              Date and Time: {new Date(camp.dateTime).toLocaleString()}
            </p>
            <p className="text-gray-700 mb-1">Location: {camp.location}</p>
            <p className="text-gray-700 mb-1">
              Healthcare Professional: {camp.healthcareProfessionalName}
            </p>
            <p className="text-gray-700 mb-1">
              Participants: {camp.participantCount}
            </p>
          </div>
        ))}
      </div>
      <div className="text-center mt-6">
        <Link
          to="/available-camps"
          className="bg-green-500 text-black px-4 py-3 font-medium hover:bg-black hover:text-white rounded"
        >
          See All Camps
        </Link>
      </div>
    </div>
  );
};

export default PopularCamps;
