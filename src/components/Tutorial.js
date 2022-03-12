import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { MdOutlineMap } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { MdOutlineAssignment } from "react-icons/md";

function Tutorial({ closeMenu }) {
  return (
    <div>
      <AiOutlineCloseCircle className="close-icon" onClick={closeMenu} />
      <div style={{ textAlign: "center" }}>
        <h1 style={{ display: "inline" }}>Tutorial</h1>
        <br />
        <br />
        <div>
          <p style={{ margin: "10px 40px 20px 40px", fontSize: "16px" }}>
            <b>Basic Instructions: </b>Our prototype provides a platform to
            manage all your assignments and tasks in one place, alongside a 3D
            world to explore. By completing assignments and acculumating points,
            you unlock new meditation exercises and new areas of the world. The
            system automatically pulls in your assignments from Canvas; as an
            example, the system is preloaded with data from one of our group
            members for you to interact with.
          </p>
          <div style={{ display: "flex", alignItems: "center" }}></div>
          <MdOutlineMap className="menu-button-tutorial" />
          <p className="paragraph-tutorial">
            The map menu allows you to see a map of the world, including which
            areas can be unlocked and how many points you need to acquire to
            unlock each new area.
          </p>
          <CgProfile className="menu-button-tutorial" />
          <p className="paragraph-tutorial">
            The profile menu allows you to sign in with your Google account,
            view your current assignment score, and view reward thresholds.
          </p>
          <MdOutlineAssignment className="menu-button-tutorial" />
          <p className="paragraph-tutorial">
            The task menu allows you to view a list of tasks pulled from Canvas
            and add custom tasks. When logged in, you receive 5 points for
            completing a task from Canvas and 2 points for completing a custom
            task.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Tutorial;
