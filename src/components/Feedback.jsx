import axios from "axios";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

const Feedback = () => {
  const [feedbackData, setFeedbackData] = useState([]);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get(
          `https://green-care-server.vercel.app/feedback`
        );
        setFeedbackData(response.data);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      }
    };

    fetchFeedback();
  }, []);

  console.log(feedbackData);
  return (
    <div className="container mx-auto p-6">
      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        breakpoints={{
          480: {
            slidesPerView: 1,
          },
          600: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
        }}
        loop={true}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {feedbackData.map((feedback) => (
          <SwiperSlide
            key={feedback._id}
            className="border border-gray-300 grid bg-gray-100 rounded-md shadow-lg"
          >
            <div className="grid border p-5">
              <div className="flex flex-col items-center">
                <img
                  src={feedback.userProfile}
                  className="h-20 w-20 rounded-full border border-gray-300"
                />
                <h2 className="font-medium mt-2">{feedback?.userName}</h2>
                <p className="mb-2">{feedback?.email}</p>
              </div>
              <p className="text-justify">{feedback?.feedback}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Feedback;
