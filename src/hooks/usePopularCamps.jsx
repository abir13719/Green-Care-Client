import usePublicAxios from "./usePublicAxios";
import { useQuery } from "@tanstack/react-query";

const usePopularCamps = () => {
  const publicAxios = usePublicAxios();

  const {
    data: popularCamps,
    isLoading: popularCampsLoading,
    error: popularCampsError,
  } = useQuery({
    queryKey: ["popularCamps"],
    queryFn: async () => {
      const res = await publicAxios.get("/popular");
      return res.data;
    },
  });

  return [popularCamps, popularCampsLoading, popularCampsError];
};

export default usePopularCamps;
