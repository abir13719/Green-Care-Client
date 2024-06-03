import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { EffectFade, Navigation, Pagination, Autoplay } from "swiper/modules";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Banner = () => {
  const {
    data: allSliders,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["sliders"],
    queryFn: async () => {
      const { data } = await axios.get("/sliders.json");
      return data;
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading sliders</div>;

  const getRandomBoolean = () => Math.random() < 0.5;

  return (
    <Swiper
      slidesPerView={1}
      effect="fade"
      loop={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      navigation={false}
      pagination={{
        clickable: true,
        type: "bullets",
      }}
      modules={[EffectFade, Navigation, Pagination, Autoplay]}
      className="mySwiper h-fit container mx-auto"
    >
      {allSliders &&
        allSliders.map((slider) => {
          const reverseLayout = getRandomBoolean();

          return (
            <SwiperSlide key={slider.id} className="relative h-full">
              <div
                className={`flex flex-col md:flex-row h-full ${
                  reverseLayout ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className="relative w-full md:w-2/3 md:h-[100vh] bg-white">
                  <img
                    src={slider.image}
                    alt={slider.title}
                    className="w-full h-full object-contain object-center"
                  />
                  <div className="md:hidden h-full absolute inset-0 bg-black bg-opacity-70 flex flex-col justify-center items-center text-white/85 p-5">
                    <h2 className="text-3xl font-bold mb-1 text-center">
                      {slider.title}
                    </h2>
                    <p className="text-center">{slider.description}</p>
                  </div>
                </div>
                <div className="hidden md:flex w-full md:w-1/3 h-[100vh] flex-col justify-center items-center p-4 bg-white">
                  <div className="text-center md:text-left">
                    <h2 className="text-5xl font-bold mb-2">{slider.title}</h2>
                    <p className="text-xl">{slider.description}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
    </Swiper>
  );
};

export default Banner;
