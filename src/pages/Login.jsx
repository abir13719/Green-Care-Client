import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LuLogIn } from "react-icons/lu";
import { useAuth } from "../contexts/AuthContext";
import Swal from "sweetalert2";
import SocialLogin from "../components/SocialLogin";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

const Login = () => {
  const { loginUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
    loginUser(data.email, data.password).then(() => {
      Swal.fire({
        title: "Login Success",
        icon: "success",
      });
      navigate(from, { replace: true });
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md border p-6 md:p-10 shadow-lg bg-gray-900 text-white rounded my-10">
        <h2 className="text-3xl font-bold mb-6">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
          <button
            type="submit"
            className="w-full mt-4 p-3 font-medium bg-green-500 rounded flex items-center gap-1 justify-center text-black"
          >
            <LuLogIn className="w-5 h-5"></LuLogIn>
            Login
          </button>
        </form>

        <hr className="border mt-10 border-gray-500" />

        <SocialLogin></SocialLogin>

        <p className="mt-4">
          Don't have an account?{" "}
          <Link to="/sign-up" className="text-blue-600">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
