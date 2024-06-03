import React from "react";
import Banner from "../components/Banner";
import PopularCamps from "../components/PopularCamps";
import Feedback from "../components/Feedback";
import HowItWork from "../components/HowItWork";

const Home = () => {
  return (
    <div className="pt-[76px]">
      <Banner></Banner>
      <PopularCamps></PopularCamps>
      <Feedback></Feedback>
      <HowItWork></HowItWork>
    </div>
  );
};

export default Home;
