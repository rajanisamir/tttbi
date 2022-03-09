import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import TaskManager from "./components/TaskManager";
import Profile from "./components/Profile";
import Map from "./components/Map";
import { MdOutlineMap } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { MdOutlineAssignment } from "react-icons/md";
import moment from "moment";

function App() {
  const [currentMenu, setCurrentMenu] = useState("None");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const url =
      "https://pyq1flh805.execute-api.us-east-1.amazonaws.com/test/assignments";

    const fetchData = async () => {
      const response = await axios(url);
      const json = JSON.parse(
        response.data
          .replace(/'/g, '"')
          .replaceAll("True", "true")
          .replaceAll("False", "false")
      ).assignments;
      console.log(json);
      let assignments = [];
      let courses = [];
      json.forEach((assignment) => {
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
          string: "",
        };
        newAssignment.due = newAssignment.due
          ? moment(newAssignment.due).format("MMM DD, hh:mm a")
          : "";
        newAssignment.course =
          newAssignment.course != null
            ? "[" + newAssignment.course.substring(0, 10) + "]"
            : "";
        newAssignment.string =
          newAssignment.due +
          " " +
          newAssignment.course +
          " " +
          newAssignment.text;
        assignments = [newAssignment, ...assignments];
      });
      setTasks((tasks) => [...assignments, ...tasks]);
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="main-view">
        {
          <div
            className="task-manager-tab"
            style={{
              display: currentMenu === "Tasks" ? "block" : "none",
            }}
          >
            <TaskManager tasks={tasks} setTasks={setTasks} />
          </div>
        }
        {
          <div
            className="profile-tab"
            style={{
              display: currentMenu === "Profile" ? "block" : "none",
            }}
          >
            <Profile />
          </div>
        }
        {
          <div
            className="map-tab"
            style={{
              display: currentMenu === "Map" ? "block" : "none",
            }}
          >
            <Map />
          </div>
        }
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
