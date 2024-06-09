import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const ManageCamps = () => {
  const [camps, setCamps] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currentCamp, setCurrentCamp] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchCamps = async () => {
      try {
        const response = await axios.get("http://localhost:5000/camps");
        setCamps(response.data);
      } catch (error) {
        console.error("Error fetching camps", error);
      }
    };

    fetchCamps();
  }, []);

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    return date.toISOString().slice(0, 16);
  };

  const onSubmit = async (data) => {
    try {
      let campImage = currentCamp.campImage;

      if (selectedImage) {
        const formData = new FormData();
        formData.append("image", selectedImage);

        const imageBBResponse = await axios.post(
          `https://api.imgbb.com/1/upload?key=${
            import.meta.env.VITE_IMGBB_API_KEY
          }`,
          formData
        );
        campImage = imageBBResponse.data.data.url;
      }

      const updatedData = {
        ...data,
        campImage,
      };

      await axios.patch(
        `http://localhost:5000/update-camp/${currentCamp._id}`,
        updatedData
      );
      setCamps(
        camps.map((camp) =>
          camp._id === currentCamp._id ? { ...camp, ...updatedData } : camp
        )
      );
      setEditMode(false);
      Swal.fire({
        icon: "success",
        title: "Camp updated successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Error updating camp", error);
    }
  };

  const handleDelete = async (campId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:5000/delete-camp/${campId}`);
          setCamps(camps.filter((camp) => camp._id !== campId));
          Swal.fire({
            icon: "success",
            title: "Camp deleted successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        } catch (error) {
          console.error("Error deleting camp", error);
        }
      }
    });
  };

  const handleEdit = (camp) => {
    setCurrentCamp(camp);
    setValue("campName", camp.campName);
    setValue("dateTime", formatDateTime(camp.dateTime));
    setValue("location", camp.location);
    setValue("healthcareProfessionalName", camp.healthcareProfessionalName);
    setValue("campFees", camp.campFees);
    setValue("description", camp.description);
    setEditMode(true);
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Manage Camps</h2>
      {editMode ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-gray-100 p-4 rounded-lg shadow-md"
        >
          <div className="mb-4">
            <label className="block text-gray-700">Camp Name</label>
            <input
              type="text"
              {...register("campName", { required: "Camp Name is required" })}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
            {errors.campName && (
              <p className="text-red-500">{errors.campName.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Camp Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setSelectedImage(e.target.files[0])}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Date & Time</label>
            <input
              type="datetime-local"
              {...register("dateTime", { required: "Date & Time is required" })}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
            {errors.dateTime && (
              <p className="text-red-500">{errors.dateTime.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Location</label>
            <input
              type="text"
              {...register("location", { required: "Location is required" })}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
            {errors.location && (
              <p className="text-red-500">{errors.location.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">
              Healthcare Professional Name
            </label>
            <input
              type="text"
              {...register("healthcareProfessionalName", {
                required: "Healthcare Professional Name is required",
              })}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
            {errors.healthcareProfessionalName && (
              <p className="text-red-500">
                {errors.healthcareProfessionalName.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Camp Fees</label>
            <input
              type="number"
              {...register("campFees", { required: "Camp Fees are required" })}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            />
            {errors.campFees && (
              <p className="text-red-500">{errors.campFees.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              {...register("description", {
                required: "Description is required",
              })}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            ></textarea>
            {errors.description && (
              <p className="text-red-500">{errors.description.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-medium px-4 py-2 rounded mr-2"
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
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-200 border border-gray-300">
                <th className="py-4 px-4">Camp Name</th>
                <th className="py-4 px-4">Date & Time</th>
                <th className="py-4 px-4">Location</th>
                <th className="py-4 px-4">Healthcare Professional</th>
                <th className="py-4 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {camps.map((camp, index) => (
                <tr
                  key={camp._id}
                  className={` border border-gray-300 ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-100"
                  }`}
                >
                  <td className="py-2 px-4">{camp.campName}</td>
                  <td className="py-2 px-4">
                    {new Date(camp.dateTime).toLocaleString()}
                  </td>
                  <td className="py-2 px-4">{camp.location}</td>
                  <td className="py-2 px-4">
                    {camp.healthcareProfessionalName}
                  </td>
                  <td className="py-2 px-4 grid gap-1">
                    <button
                      onClick={() => handleEdit(camp)}
                      className="bg-green-500 hover:bg-black text-black hover:text-white px-4 py-2 rounded"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(camp._id)}
                      className="bg-red-500 hover:bg-black text-black hover:text-white px-4 py-2 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageCamps;
