import usePublicAxios from "./usePublicAxios";
import { useQuery } from "@tanstack/react-query";

const useCamps = () => {
  const publicAxios = usePublicAxios();

  const {
    data: allCamps,
    isLoading: allCampsLoading,
    error: allCampsLoadingError,
    refetch: allCampsRefetch,
  } = useQuery({
    queryKey: ["allCamps"],
    queryFn: async () => {
      const res = await publicAxios.get("/camps");
      return res.data;
    },
  });

  return [allCamps, allCampsLoading, allCampsLoadingError, allCampsRefetch];
};

export default useCamps;
