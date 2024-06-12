import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { GoChecklist } from "react-icons/go";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import usePublicAxios from "../hooks/usePublicAxios";
import Swal from "sweetalert2";
import SocialLogin from "../components/SocialLogin";

//Signup Form Input Validation
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  profilePicture: yup
    .mixed()
    .test("required", "Profile picture is required", (value) => {
      return value && value.length > 0;
    })
    .test("fileSize", "The file is too large", (value) => {
      return value && value.length > 0 && value[0].size <= 2 * 1024 * 1024;
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
});

const SignUp = () => {
  const publicAxios = usePublicAxios();
  const { user, createUser, updateUserProfile } = useAuth();
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

      const userCredential = await createUser(data.email, data.password);
      const user = userCredential.user;
      await updateUserProfile(user, data.name, imageUrl);

      const userData = {
        uid: user.uid,
        name: data.name,
        email: data.email,
        profilePicture: imageUrl,
      };

      await publicAxios.post("/users", userData);
      Swal.fire({
        title: "Registration Success",
        icon: "success",
      });
      navigate("/");
    } catch (error) {
      console.error(error);
      setError("apiError", {
        message: "Registration failed. Please try again.",
      });
    }
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

        <SocialLogin></SocialLogin>

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
