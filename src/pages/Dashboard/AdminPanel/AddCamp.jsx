import React from "react";

const AddCamp = () => {
  return (
    <div className="bg-green-300">
      <div className="container mx-auto h-screen flex flex-col items-center justify-center">
        <h1 className="text-5xl font-bold">This will be Add Camp</h1>
        <p className="text-center">
          On this page, the organizer will input the following Form fields:
          <ol>
            <li>A. Camp Name</li>
            <li>B. Image</li>
            <li>C. Camp Fees</li>
            <li>D. Date & Time</li>
            <li>E. Location</li>
            <li>F. Healthcare Professional Name</li>
            <li>G. participant count(starts at 0)</li>
            <li>H. Description</li>
          </ol>
          Utilizing Formik or React Hook Form, validate and save the entered
          data in the database, ensuring accuracy and completeness.The camp
          details entered by the organizer will be shown on the available camps
          page for everyone to see.
        </p>
      </div>
    </div>
  );
};

export default AddCamp;
