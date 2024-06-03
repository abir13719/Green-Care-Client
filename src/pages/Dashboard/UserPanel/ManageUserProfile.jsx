import React from "react";

const ManageUserProfile = () => {
  return (
    <div className="bg-green-300">
      <div className="container mx-auto h-screen flex flex-col items-center justify-center">
        <h1 className="text-5xl font-bold">This will be Mange User Profile</h1>
        <p className="text-center">
          Allow participants to manage their profile information, including
          name, image, and contact details. They can click the "Update" button
          to open a form with their current information for editing.
        </p>
      </div>
    </div>
  );
};

export default ManageUserProfile;
