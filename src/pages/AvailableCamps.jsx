import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const AvailableCamps = () => {
  const [camps, setCamps] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortCriteria, setSortCriteria] = useState("");
  const [layout, setLayout] = useState("three-column");

  useEffect(() => {
    const fetchCamps = async () => {
      const response = await axios.get(
        "https://green-care-server.vercel.app/camps"
      );
      setCamps(response.data);
    };
    fetchCamps();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (e) => {
    setSortCriteria(e.target.value);
  };

  const toggleLayout = () => {
    setLayout(layout === "three-column" ? "two-column" : "three-column");
  };

  const filteredCamps = camps.filter((camp) =>
    camp.campName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedCamps = filteredCamps.sort((a, b) => {
    if (sortCriteria === "most-registered") {
      return b.participantCount - a.participantCount;
    }
    if (sortCriteria === "camp-fees") {
      return a.campFees - b.campFees;
    }
    if (sortCriteria === "alphabetical") {
      return a.campName.localeCompare(b.campName);
    }
    return 0;
  });

  return (
    <div className="min-h-screen py-6">
      <div className="container mx-auto pt-24 px-4 md:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <div className="bg-gray-100 border border-gray-300 flex items-center pl-4 pr-2 overflow-hidden mb-4 md:mb-0 w-full md:w-auto">
            <FaSearch />
            <input
              type="search"
              placeholder="Search camps"
              value={searchTerm}
              onChange={handleSearch}
              className="p-2 outline-none bg-gray-100 border-none placeholder:text-black w-full md:w-auto"
            />
          </div>

          <select
            value={sortCriteria}
            onChange={handleSort}
            className="px-5 py-2 bg-gray-100 border border-gray-300 outline-none appearance-none mb-4 md:mb-0 w-full md:w-auto"
          >
            <option value="" disabled>
              Sort by
            </option>
            <option value="most-registered">Most Registered</option>
            <option value="camp-fees">Camp Fees</option>
            <option value="alphabetical">Alphabetical Order</option>
          </select>

          <button
            onClick={toggleLayout}
            className="hidden lg:block py-2 px-4 bg-gray-100 border border-gray-300 w-full md:w-auto"
          >
            {layout === "three-column" ? "2 Column" : "3 Column"}
          </button>
        </div>
        <div
          className={`grid ${
            layout === "three-column"
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              : "grid-cols-1 md:grid-cols-2"
          } gap-4`}
        >
          {sortedCamps.map((camp) => (
            <div
              key={camp._id}
              className="bg-gray-100 border border-gray-300 p-4 rounded shadow-lg flex flex-col justify-between"
            >
              <img
                className={`w-full object-cover border border-gray-300 rounded mb-2 ${
                  layout === "three-column" ? "h-48" : "h-64"
                }`}
                src={camp.campImage}
                alt={camp.campName}
              />
              <h3 className="text-xl font-semibold mb-2">{camp.campName}</h3>
              <p className="text-justify mb-4 flex-grow">{camp.description}</p>
              <div className="flex justify-between mb-4">
                <p>Fees: ${camp.campFees}</p>
                <p>Participants: {camp.participantCount}</p>
              </div>
              <Link
                to={`/camps/${camp._id}`}
                className="bg-green-500 hover:bg-black font-medium hover:text-white/90 px-3 py-2 rounded text-center"
              >
                Details
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AvailableCamps;
