import React from "react";
import {
  FaUserPlus,
  FaMapMarkerAlt,
  FaThumbsUp,
  FaClipboardList,
  FaHandsHelping,
  FaTasks,
} from "react-icons/fa";

const HowItWork = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          How Does It Work?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="bg-gray-100 border border-gray-300 p-6 rounded-lg shadow-md flex flex-col items-center text-center">
            <FaUserPlus className="text-black h-12 w-12 mb-4" />
            <h3 className="text-xl font-semibold mb-2">1. Register</h3>
            <p className="text-gray-800">
              Sign up and create your account to join the community. Fill in
              your details to get started.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-gray-100 border border-gray-300 p-6 rounded-lg shadow-md flex flex-col items-center text-center">
            <FaMapMarkerAlt className="text-black h-12 w-12 mb-4" />
            <h3 className="text-xl font-semibold mb-2">2. Find a Camp</h3>
            <p className="text-gray-800">
              Browse available medical camps in your area. Choose a camp that
              suits your needs and preferences.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-gray-100 border border-gray-300 p-6 rounded-lg shadow-md flex flex-col items-center text-center">
            <FaClipboardList className="text-black h-12 w-12 mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              3. Register for the Camp
            </h3>
            <p className="text-gray-800">
              Sign up for the medical camp of your choice. Provide the necessary
              details and complete the registration process.
            </p>
          </div>

          {/* Step 4 */}
          <div className="bg-gray-100 border border-gray-300 p-6 rounded-lg shadow-md flex flex-col items-center text-center">
            <FaTasks className="text-black h-12 w-12 mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              4. Prepare for the Camp
            </h3>
            <p className="text-gray-800">
              Get ready for the camp by gathering necessary documents and
              essentials. Follow the provided guidelines.
            </p>
          </div>

          {/* Step 5 */}
          <div className="bg-gray-100 border border-gray-300 p-6 rounded-lg shadow-md flex flex-col items-center text-center">
            <FaHandsHelping className="text-black h-12 w-12 mb-4" />
            <h3 className="text-xl font-semibold mb-2">5. Attend the Camp</h3>
            <p className="text-gray-800">
              Participate in the medical camp. Receive medical assistance and
              engage in health-related activities.
            </p>
          </div>

          {/* Step 6 */}
          <div className="bg-gray-100 border border-gray-300 p-6 rounded-lg shadow-md flex flex-col items-center text-center">
            <FaThumbsUp className="text-black h-12 w-12 mb-4" />
            <h3 className="text-xl font-semibold mb-2">6. Give Feedback</h3>
            <p className="text-gray-800">
              Share your experience. Provide feedback and rate the medical camp
              to help us improve.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWork;
