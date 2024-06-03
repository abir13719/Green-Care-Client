import React from "react";

const Analytics = () => {
  return (
    <div className="bg-green-200">
      <div className="container mx-auto h-screen flex flex-col items-center justify-center">
        <h1 className="text-5xl font-bold">This will be Analytics</h1>
        <p className="text-center">
          In this route, you're tasked with implementing a chart feature. The
          chart will display data related to participants' lifetime registered
          camps, such as camp names, fees, or any other relevant information.
          You have the freedom to design and customize the chart's appearance
          and functionality according to your preferences. However, ensure that
          the chart accurately reflects the data from camps registered by a
          participant.
        </p>
        <p className="text-center">
          Note: Use Recharts or a similar library to display analytics in this
          route. Visualize data from a participant's registered camps
          accurately.
        </p>
      </div>
    </div>
  );
};

export default Analytics;
