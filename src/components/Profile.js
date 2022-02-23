import React from "react";

function Profile() {
    return (
        <div>
          <h1>User Profile</h1>
          <b>Username</b>
          <p>Assignment Score: {global.assignmentScore}</p>
        </div>
      );
}

export default Profile;
