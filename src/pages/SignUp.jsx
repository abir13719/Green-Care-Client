import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle, FaHome } from "react-icons/fa";
import { GoChecklist } from "react-icons/go";
import axios from "axios";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  profilePicture: yup
    .mixed()
    .required("Profile picture is required")
    .test("fileSize", "The file is too large", (value) => {
      return value && value[0] && value[0].size <= 2 * 1024 * 1024;
    })
    .test("fileType", "Unsupported File Format", (value) => {
      return (
        value &&
        value[0] &&
        ["image/jpeg", "image/png", "image/gif"].includes(value[0].type)
      );
    }),
});

const SignUp = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("image", data.profilePicture[0]);

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

      const userData = {
        name: data.name,
        email: data.email,
        profilePicture: imageUrl,
      };

      await axios.post("http://localhost:5000/users", userData);
      navigate("/login");
    } catch (error) {
      console.error(error);
      setError("apiError", {
        message: "Registration failed. Please try again.",
      });
    }
  };

  const handleGoogleLogin = () => {
    // Handle Google login logic
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-6 md:p-10 bg-gray-900 text-white rounded my-10">
        <h2 className="text-3xl font-bold mb-6">Register</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block mb-2">Name</label>
            <input
              {...register("name")}
              className="w-full p-3 border rounded text-black"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div>
            <label className="block mb-2">Email</label>
            <input
              {...register("email")}
              className="w-full p-3 border rounded text-black"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div>
            <label className="block mb-2">Password</label>
            <input
              type="password"
              {...register("password")}
              className="w-full p-3 border rounded text-black"
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>
          <div>
            <label className="block mb-2">Profile Picture</label>
            <input
              type="file"
              {...register("profilePicture")}
              className="w-full rounded"
            />
            {errors.profilePicture && (
              <p className="text-red-500">{errors.profilePicture.message}</p>
            )}
          </div>
          {errors.apiError && (
            <p className="text-red-500">{errors.apiError.message}</p>
          )}
          <button
            type="submit"
            className="w-full mt-4 p-3 font-medium bg-green-500 rounded flex items-center gap-1 justify-center text-black"
          >
            <GoChecklist className="w-5 h-5"></GoChecklist>
            Register
          </button>
        </form>

        <hr className="border mt-10 border-gray-500" />

        <button
          onClick={handleGoogleLogin}
          className="w-full mt-4 p-3 font-medium bg-green-500 rounded flex items-center gap-1 justify-center text-black"
        >
          <FaGoogle></FaGoogle> Register with Google
        </button>
        <button
          onClick={() => navigate("/")}
          className="w-full mt-4 p-3 font-medium bg-green-500 rounded flex items-center gap-1 justify-center text-black"
        >
          <FaHome className="w-5 h-5"></FaHome>
          Home
        </button>
        <p className="mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
