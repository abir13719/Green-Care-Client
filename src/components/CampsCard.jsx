import React from "react";
import { Link } from "react-router-dom";

const CampsCard = () => {
  return (
    <Link to="/camp-details">
      <div>
        <ul className="bg-green-200 p-6">
          <li>a. Camp Name</li>
          <li>b. Image</li>
          <li>c. Camp Fees</li>
          <li>d. Date and Time</li>
          <li>e. Location</li>
          <li>e. Location</li>
          <li>f. Healthcare Professional</li>
          <li>g. participant count</li>
          <li>h. Description</li>
          <li>i. Join Camp Button</li>
        </ul>
      </div>
    </Link>
  );
};

export default CampsCard;
