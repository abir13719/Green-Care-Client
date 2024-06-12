import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import usePublicAxios from "./usePublicAxios";
import { useQuery } from "@tanstack/react-query";

const useAdmin = () => {
  const { user } = useAuth();
  const publicAxios = usePublicAxios();
  const [isAdmin, setIsAdmin] = useState(false);

  const {
    data,
    isLoading: adminLoading,
    isError: adminError,
  } = useQuery({
    queryKey: ["isAdmin", user?.email],
    queryFn: async () => {
      const res = await publicAxios.get(`/users/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  useEffect(() => {
    if (data?.role === "Admin") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [data]);

  return [isAdmin, adminLoading, adminError];
};

export default useAdmin;
