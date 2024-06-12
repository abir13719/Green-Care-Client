import axios from "axios";

const secureAxios = axios.create({
  baseURL: "https://green-care-server.vercel.app",
});

const useSecureAxios = () => {
  return secureAxios;
};

export default useSecureAxios;
