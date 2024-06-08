import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

const RegistrationModal = ({ camp, user, isOpen, onClose }) => {
  const modalRef = useRef();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const onSubmit = async (data) => {
    const participantData = {
      campId: camp._id,
      campName: camp.campName,
      campFees: camp.campFees,
      location: camp.location,
      healthcareProfessionalName: camp.healthcareProfessionalName,
      participantName: user.displayName,
      participantEmail: user.email,
      age: data.age,
      phoneNumber: data.phoneNumber,
      gender: data.gender,
      emergencyContact: data.emergencyContact,
    };

    console.log(participantData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
      <div
        ref={modalRef}
        className="bg-gray-900 text-white/85 p-6 rounded-lg relative w-full max-w-md max-h-full overflow-y-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white bg-red-500 px-2 rounded"
        >
          &times;
        </button>
        <h2 className="text-2xl font-semibold mb-4">Join Camp</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <div>
            <label className="block font-medium">Camp Name</label>
            <input
              type="text"
              value={camp.campName}
              readOnly
              className="w-full p-2 border rounded text-black"
            />
          </div>
          <div>
            <label className="block font-medium">Camp Fees</label>
            <input
              type="text"
              value={camp.campFees}
              readOnly
              className="w-full p-2 border rounded text-black"
            />
          </div>
          <div>
            <label className="block font-medium">Location</label>
            <input
              type="text"
              value={camp.location}
              readOnly
              className="w-full p-2 border rounded text-black"
            />
          </div>
          <div>
            <label className="block font-medium">
              Healthcare Professional Name
            </label>
            <input
              type="text"
              value={camp.healthcareProfessionalName}
              readOnly
              className="w-full p-2 border rounded text-black"
            />
          </div>
          <div>
            <label className="block font-medium">Participant Name</label>
            <input
              type="text"
              value={user.displayName}
              readOnly
              className="w-full p-2 border rounded text-black"
            />
          </div>
          <div>
            <label className="block font-medium">Participant Email</label>
            <input
              type="text"
              value={user.email}
              readOnly
              className="w-full p-2 border rounded text-black"
            />
          </div>
          <div>
            <label className="block font-medium">Age</label>
            <input
              type="number"
              {...register("age", { required: "Age is required" })}
              className="w-full p-2 border rounded text-black"
            />
            {errors.age && (
              <span className="text-red-500">{errors.age.message}</span>
            )}
          </div>
          <div>
            <label className="block font-medium">Phone Number</label>
            <input
              type="tel"
              {...register("phoneNumber", {
                required: "Phone Number is required",
              })}
              className="w-full p-2 border rounded text-black"
            />
            {errors.phoneNumber && (
              <span className="text-red-500">{errors.phoneNumber.message}</span>
            )}
          </div>
          <div>
            <label className="block font-medium">Gender</label>
            <select
              {...register("gender", { required: "Gender is required" })}
              className="w-full p-2 border rounded text-black"
            >
              <option value="" disabled>
                Select Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && (
              <span className="text-red-500">{errors.gender.message}</span>
            )}
          </div>
          <div>
            <label className="block font-medium">Emergency Contact</label>
            <input
              type="tel"
              {...register("emergencyContact", {
                required: "Emergency Contact is required",
              })}
              className="w-full p-2 border rounded text-black"
            />
            {errors.emergencyContact && (
              <span className="text-red-500">
                {errors.emergencyContact.message}
              </span>
            )}
          </div>
          <button
            type="submit"
            className="bg-green-500 text-black p-3 rounded mt-4"
          >
            Join Camp
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationModal;
