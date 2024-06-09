import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import useSecureAxios from "../../../hooks/useSecureAxios";
import Swal from "sweetalert2";

const validationSchema = yup.object().shape({
  campName: yup.string().required("Camp Name is required"),
  image: yup
    .mixed()
    .test("required", "Profile picture is required", (value) => {
      return value && value.length > 0;
    })
    .test("fileType", "Unsupported File Format", (value) => {
      return (
        value &&
        value.length > 0 &&
        ["image/jpeg", "image/jpg", "image/png", "image/gif"].includes(
          value[0].type
        )
      );
    }),
  campFees: yup
    .number()
    .required("Camp Fees is required")
    .positive("Camp Fees must be a positive number"),
  dateTime: yup.date().required("Date & Time is required"),
  location: yup.string().required("Location is required"),
  healthcareProfessionalName: yup
    .string()
    .required("Healthcare Professional Name is required"),
  participantCount: yup
    .number()
    .min(0, "Participant Count must be at least 0")
    .required("Participant Count is required"),
  description: yup.string().required("Description is required"),
});

const AddCamp = () => {
  const secureAxios = useSecureAxios();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("image", data.image[0]);
      const imgbbRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMGBB_API_KEY
        }`,
        formData,
        {
          headers: {
            "content-type": "multipart/form-data",
          },
        }
      );
      const imageUrl = imgbbRes.data.data.display_url;

      const CampData = {
        campName: data.campName,
        campImage: imageUrl,
        campFees: data.campFees,
        dateTime: data.dateTime,
        location: data.location,
        healthcareProfessionalName: data.healthcareProfessionalName,
        participantCount: data.participantCount,
        description: data.description,
      };

      console.log(CampData);
      // Send form data to backend API
      await secureAxios.post("/camps", CampData).then(() => {
        Swal.fire({
          title: "Camp Added Successfully",
          icon: "success",
        });
        reset();
      });
    } catch (error) {
      console.error("Error adding camp", error);
    }
  };

  return (
    <div className="w-full p-6 md:p-10 bg-gray-100">
      <h2 className="text-2xl font-semibold mb-6">Add Camp</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-3"
      >
        <div className="col-span-2">
          <label htmlFor="campName" className="block font-medium">
            Camp Name
          </label>
          <input
            {...register("campName")}
            type="text"
            id="campName"
            className="w-full p-3 text-black border border-gray-300"
          />
          {errors.campName && (
            <span className="text-red-500">{errors.campName.message}</span>
          )}
        </div>

        <div>
          <label htmlFor="image" className="block font-medium">
            Image URL
          </label>
          <input
            {...register("image")}
            type="file"
            id="image"
            className="w-full p-[9px] text-black border border-gray-300 bg-white"
          />
          {errors.image && (
            <span className="text-red-500">{errors.image.message}</span>
          )}
        </div>

        <div>
          <label htmlFor="campFees" className="block font-medium">
            Camp Fees
          </label>
          <input
            {...register("campFees")}
            type="number"
            id="campFees"
            className="w-full p-3 text-black border border-gray-300"
          />
          {errors.campFees && (
            <span className="text-red-500">{errors.campFees.message}</span>
          )}
        </div>

        <div>
          <label htmlFor="dateTime" className="block font-medium">
            Date & Time
          </label>
          <input
            {...register("dateTime")}
            type="datetime-local"
            id="dateTime"
            className="w-full p-[11px] text-black border border-gray-300"
          />
          {errors.dateTime && (
            <span className="text-red-500">{errors.dateTime.message}</span>
          )}
        </div>

        <div>
          <label htmlFor="location" className="block font-medium">
            Location
          </label>
          <input
            {...register("location")}
            type="text"
            id="location"
            className="w-full p-3 text-black border border-gray-300"
          />
          {errors.location && (
            <span className="text-red-500">{errors.location.message}</span>
          )}
        </div>

        <div>
          <label
            htmlFor="healthcareProfessionalName"
            className="block font-medium"
          >
            Healthcare Professional Name
          </label>
          <input
            {...register("healthcareProfessionalName")}
            type="text"
            id="healthcareProfessionalName"
            className="w-full p-3 text-black border border-gray-300"
          />
          {errors.healthcareProfessionalName && (
            <span className="text-red-500">
              {errors.healthcareProfessionalName.message}
            </span>
          )}
        </div>

        <div>
          <label htmlFor="participantCount" className="block font-medium">
            Participant Count
          </label>
          <input
            {...register("participantCount")}
            type="number"
            id="participantCount"
            defaultValue={0}
            className="w-full p-3 text-black border border-gray-300"
          />
          {errors.participantCount && (
            <span className="text-red-500">
              {errors.participantCount.message}
            </span>
          )}
        </div>

        <div className="col-span-2">
          <label htmlFor="description" className="block font-medium">
            Description
          </label>
          <textarea
            {...register("description")}
            id="description"
            className="w-full p-3 text-black border border-gray-300"
          />
          {errors.description && (
            <span className="text-red-500">{errors.description.message}</span>
          )}
        </div>

        <button
          type="submit"
          className="col-span-2 w-full mt-4 p-3 font-medium bg-green-500 hover:bg-black hover:text-white flex items-center gap-1 justify-center text-black"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddCamp;
