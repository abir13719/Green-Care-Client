import React from "react";

const ManageCamps = () => {
  return (
    <div className="bg-green-200">
      <div className="container mx-auto h-screen flex flex-col items-center justify-center">
        <h1 className="text-5xl font-bold">This will be Manage Camps</h1>
        <p className="text-center">
          Show a table of camps created by the organizer with key details like
          name, Date & Time, Location, Healthcare Professional, and Include
          buttons for editing and deleting each camp.
        </p>
        <p className="text-center">
          <b>Update:</b> Give organizers the ability to change camp details
          using the "Update" button. They can access this feature through the
          simple endpoint: /update-camp/:campId
        </p>
        <p className="text-center">
          <b>Delete:</b> Allow organizers to swiftly erase camps from the system
          with the mighty "Delete" button. This action can be executed through
          the straightforward route endpoint: /delete-camp/:campId.
        </p>
      </div>
    </div>
  );
};

export default ManageCamps;
