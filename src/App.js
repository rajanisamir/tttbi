import React, { useState } from "react";
import "./App.css";
import TaskManager from "./components/TaskManager";
import Profile from "./components/Profile";
import Map from "./components/Map";
import { MdOutlineMap } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { MdOutlineAssignment } from "react-icons/md";

function App() {
  const [currentMenu, setCurrentMenu] = useState("None");

  return (
    <div>
      <div className="main-view">
        {currentMenu === "Tasks" && (
          <div className="task-manager-tab">
            <TaskManager />
          </div>
        )}
        {currentMenu === "Profile" && (
          <div className="profile-tab">
            <Profile />
          </div>
        )}
        {currentMenu === "Map" && (
          <div className="map-tab">
            <Map />
          </div>
        )}
      </div>
      <div>
        <MdOutlineMap
          onClick={() => {
            setCurrentMenu(currentMenu === "Map" ? "None" : "Map");
          }}
          className="menu-button"
          id="map-button"
        />
        <CgProfile
          onClick={() => {
            setCurrentMenu(currentMenu === "Profile" ? "None" : "Profile");
          }}
          className="menu-button"
          id="profile-button"
        />
        <MdOutlineAssignment
          onClick={() => {
            setCurrentMenu(currentMenu === "Tasks" ? "None" : "Tasks");
          }}
          className="menu-button"
          id="tasks-button"
        />
      </div>
    </div>
  );
}

export default App;
