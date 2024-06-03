import React, { useState } from "react";

const CampDetails = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const loggedInInfo = {
    name: "John Doe",
    email: "john.doe@example.com",
    age: 25,
    phoneNumber: "123-456-7890",
    gender: "Male",
    emergencyContact: "Jane Doe: 098-765-4321",
  };

  const campDetails = {
    name: "Summer Camp",
    fees: "$200",
    location: "Mountain View",
    healthcareProfessional: "Dr. Smith",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    console.log("Form submitted:", data);
  };

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const handleOutsideClick = (e) => {
    if (e.target.id === "modal-container") {
      closeModal();
    }
  };
  return (
    <div className="bg-green-300">
      <div className="container mx-auto ">
        {!isModalVisible && (
          <div className="h-screen flex flex-col items-center justify-center">
            <h1 className="text-5xl font-bold">This will be Camp Details</h1>
            <p className="text-center">
              The details will have the following:
              <ol>
                <li>a. Camp Name</li>
                <li>b. Image</li>
                <li>c. Camp Fees</li>
                <li>d. Date and Time</li>
                <li>e. Location</li>
                <li>f. Healthcare Professional</li>
                <li>g. participant count</li>
                <li>h. Description</li>
              </ol>
            </p>
            <button
              onClick={openModal}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Join Camp Button
            </button>
          </div>
        )}

        {isModalVisible && (
          <div
            id="modal-container"
            className="pt-20 bg-opacity-50 flex justify-center items-center z-[500]"
            onClick={handleOutsideClick}
          >
            <div className="bg-white p-6 rounded-md shadow-md w-1/2 relative">
              <button
                className="absolute top-2 right-2 px-2 py-1 text-white rounded-md bg-red-600"
                onClick={closeModal}
              >
                X
              </button>
              <form onSubmit={handleSubmit} className="">
                <div className="mb-4">
                  <label className="block text-gray-700">Camp Name</label>
                  <input className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-gray-100 rounded-md"></input>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Camp Fees</label>
                  <input className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-gray-100 rounded-md"></input>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Location</label>
                  <input className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-gray-100 rounded-md"></input>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">
                    Healthcare Professional Name
                  </label>
                  <input className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-gray-100 rounded-md"></input>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">
                    Participant Name
                  </label>
                  <input className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-gray-100 rounded-md"></input>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">
                    Participant Email
                  </label>
                  <input className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-gray-100 rounded-md"></input>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Age</label>
                  <input
                    type="number"
                    name="age"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Phone Number</label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Gender</label>
                  <select
                    name="gender"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">
                    Emergency Contact
                  </label>
                  <input
                    type="text"
                    name="emergencyContact"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <button
                  type="submit"
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CampDetails;
