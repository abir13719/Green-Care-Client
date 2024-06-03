import React from "react";
import { FaSearch } from "react-icons/fa";

const AllCamps = () => {
  return (
    <div className="bg-green-300">
      <div className="pt-20 h-screen flex flex-col items-center">
        <h1 className="text-5xl font-bold">This will be All Camps</h1>
        <p className="text-center">
          In the route, display all the camp data added by organizers from add a
          camp route (see Add A Camp for details ).Include a prominent "Details"
          button next to each camp listing. This button links to a details page
          where participants can express interest and register using a "Join
          Camp" button. Note: Link each camp on the "Available Camps" page to
          its Details Page.
        </p>
        <ol>
          Additional Feature:
          <li>
            A. Introduce a search bar allowing users to search for specific
            camps based on keywords, dates, or other relevant criteria.
          </li>
          <li>
            B. Allow users to sort available camps by various criteria,
            including Most Registered, Camp Fees, and Alphabetical Order (Camp
            Name).
          </li>
          <li>
            C. Design a layout button. Initially, cards will be displayed in
            three columns. After clicking the button, they will switch to a
            two-column layout
          </li>
        </ol>

        <div className="md:flex">
          <div className="border flex items-center bg-white pl-4 rounded-full overflow-hidden">
            <FaSearch></FaSearch>
            <input
              className="bg-white p-4 outline-none w-[400px]"
              type="search"
              value={" keywords, dates, or other relevant criteria."}
              name=""
              id=""
            />
          </div>
          <div>
            <select
              name=""
              id=""
              defaultValue="default"
              className="p-4 outline-none border-none rounded-full"
            >
              <option disabled value="default">
                Sort by
              </option>
              <option value="Most Registered">Most Registered</option>
              <option value="Camp Fees">Camp Fees</option>
              <option value="Camp Name">Camp Name</option>
            </select>
          </div>
        </div>
        <p className="bg-red-500">
          Design a layout button. Initially, cards will be displayed in three
          columns. After clicking the button, they will switch to a two-column
          layout.
        </p>
      </div>
    </div>
  );
};

export default AllCamps;
