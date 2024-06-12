import usePublicAxios from "./usePublicAxios";
import { useQuery } from "@tanstack/react-query";

const useSliders = () => {
  const publicAxios = usePublicAxios();

  const {
    data: bannerSliders = [],
    isLoading: bannerLoading,
    error: bannerError,
  } = useQuery({
    queryKey: ["sliders"],
    queryFn: async () => {
      const res = await publicAxios.get("/sliders");
      return res.data;
    },
  });

  return [bannerSliders, bannerLoading, bannerError];
};

export default useSliders;
