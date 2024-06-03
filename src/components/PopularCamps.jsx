import React from "react";
import CampsCard from "./CampsCard";

const PopularCamps = () => {
  return (
    <section className="bg-green-300 py-2">
      <div className="container mx-auto flex flex-col items-center">
        <h1 className="text-5xl font-bold">This will be Popular Camps</h1>
        <p className="text-center">
          Create a section showcasing popular medical camps(highest participant
          count) with details for maximum six camps, including Camp Name, Image,
          Camp Fees, Date and Time, Location, Healthcare Professional,
          participant count.
        </p>
        <ul>
          <li>
            A. Participant Counts begin at zero and increase with each user
            joining a camp (refer to camp details).
          </li>
          <li>
            B. After implementing the above features, include a "See All Camps"
            button to direct users to an "Available Camps" page.
          </li>
        </ul>
        <div className="grid grid-cols-3 gap-4 border w-full">
          <CampsCard></CampsCard>
          <CampsCard></CampsCard>
          <CampsCard></CampsCard>
          <CampsCard></CampsCard>
          <CampsCard></CampsCard>
          <CampsCard></CampsCard>
        </div>
      </div>
    </section>
  );
};

export default PopularCamps;
