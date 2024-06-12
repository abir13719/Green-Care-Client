import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../../contexts/AuthContext";
import { useForm } from "react-hook-form";

const ManageAdminProfile = () => {
  const { user, updateUserProfile } = useAuth();
  const email = user?.email;
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (email) {
      const fetchProfile = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/users/${email}`
          );
          setProfile(response.data);
          reset(response.data);
        } catch (error) {
          console.error("Error fetching profile", error);
        }
      };

      fetchProfile();
    }
  }, [email, reset]);

  const onSubmit = async (data) => {
    const newData = {
      name: data.name,
      profilePicture: data.profilePicture,
      phone: data.contactDetails,
    };
    try {
      await axios.patch(`http://localhost:5000/users/${email}`, newData);
      updateUserProfile(user, newData.name, newData.profilePicture);
      setProfile(data);
      setEditMode(false);
    } catch (error) {
      console.error("Error updating profile", error);
    }
  };
  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Profile</h2>
      {editMode ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-gray-100 p-4 rounded-lg shadow-md"
        >
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              defaultValue={user.email}
              disabled
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Profile Picture URL</label>
            <input
              type="text"
              {...register("profilePicture")}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Contact Details</label>
            <input
              type="text"
              {...register("contactDetails")}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              defaultValue={profile?.phone}
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 hover:bg-black text-white font-medium px-4 py-2 rounded mr-2"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => setEditMode(false)}
            className="bg-gray-500 hover:bg-gray-700 text-white font-medium px-4 py-2 rounded"
          >
            Cancel
          </button>
        </form>
      ) : (
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <img
            src={profile.profilePicture}
            alt={profile.name}
            className="w-32 h-32 rounded-full mb-4"
          />
          <h3 className="text-2xl font-semibold mb-2">{profile.name}</h3>
          <p className="text-gray-700 mb-2">{profile.email}</p>
          <p className="text-gray-700 mb-2">{profile.contactDetails}</p>
          <button
            onClick={() => setEditMode(true)}
            className="bg-green-500 text-white font-medium hover:bg-black px-4 py-2 rounded"
          >
            Update
          </button>
        </div>
      )}
    </div>
  );
};

export default ManageAdminProfile;
