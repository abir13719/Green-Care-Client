import axios from "axios";

const secureAxios = axios.create({
  baseURL: "http://localhost:5000",
});

const useSecureAxios = () => {
  return secureAxios;
};

export default useSecureAxios;
