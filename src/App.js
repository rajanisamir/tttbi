import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import TaskManager from "./components/TaskManager";
import Profile from "./components/Profile";
import Map from "./components/Map";
import { MdOutlineMap } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { MdOutlineAssignment } from "react-icons/md";

function App() {
  const [currentMenu, setCurrentMenu] = useState("None");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const url =
      "https://pyq1flh805.execute-api.us-east-1.amazonaws.com/test/assignments";

    const fetchData = async () => {
      const response = await axios(url);
      const json = JSON.parse(response.data.replace(/'/g, '"')).assignments; // Replace single quotes with double quotes!
      let assignments = [];
      let courses = [];
      json.forEach((assignment) => {
        if (new Date() > new Date(assignment.Due)) return;
        if (!courses.includes(assignment.Course)) {
          courses = [...courses, assignment.Course];
        }
        const newAssignment = {
          due: assignment.Due,
          course: assignment.Course,
          text: assignment.Name,
          id: assignment.ID,
          custom: false,
          courseIndex: courses.indexOf(assignment.Course),
        };
        assignments = [newAssignment, ...assignments];
      });
      setTasks((tasks) => [...assignments, ...tasks]);
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="main-view">
        {currentMenu === "Tasks" && (
          <div className="task-manager-tab">
            <TaskManager tasks={tasks} setTasks={setTasks} />
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
