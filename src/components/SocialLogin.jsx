import React from "react";
import { FaGoogle, FaHome } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Swal from "sweetalert2";
import usePublicAxios from "../hooks/usePublicAxios";

const SocialLogin = () => {
  const publicAxios = usePublicAxios();
  const { GoogleLoginUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleGoogleLogin = async () => {
    try {
      const userCredential = await GoogleLoginUser();
      const user = userCredential.user;

      const userData = {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        profilePicture: user.photoURL,
      };

      await publicAxios.post("/users", userData);
      Swal.fire({
        title: "Login Success",
        icon: "success",
      });
      navigate(from, { replace: true });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <button
        onClick={handleGoogleLogin}
        className="w-full mt-4 p-3 font-medium bg-green-500 rounded flex items-center gap-1 justify-center text-black"
      >
        <FaGoogle></FaGoogle> Login with Google
      </button>
      <button
        onClick={() => navigate("/")}
        className="w-full mt-4 p-3 font-medium bg-green-500 rounded flex items-center gap-1 justify-center text-black"
      >
        <FaHome className="w-5 h-5"></FaHome>
        Home
      </button>
    </>
  );
};

export default SocialLogin;
