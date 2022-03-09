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
import VRScene from "./components/VRScene";

function App() {
  const [currentMenu, setCurrentMenu] = useState("None");
  const [tasks, setTasks] = useState([]);
  const [courses, setCourses] = useState([]);
  const [docRef, setDocRef] = useState(null);
  const [score, setScore] = useState(-1);

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
      let courseList = [];
      json.forEach((assignment) => {
        const courseString = assignment.Course
          ? "[" + assignment.Course.substring(0, 10) + "]"
          : "";
        if (!courseList.includes(courseString)) {
          courseList = [...courseList, courseString];
        }
        const newAssignment = {
          due: assignment.Due,
          course: courseString,
          text: assignment.Name,
          id: assignment.ID,
          custom: false,
          courseIndex: courseList.indexOf(courseString),
          string: "",
        };
        newAssignment.due = newAssignment.due
          ? moment(newAssignment.due).format("MMM DD, hh:mm a")
          : "";
        // PRIORITY TO BE IMPLEMENTED
        // newAssignment.priority = (newAssignment.text.toLowerCase().includes('project')
        //                       || newAssignment.text.toLowerCase().includes('exam')
        //                       || newAssignment.text.toLowerCase().includes('midterm'))
        //                       ? 'High Priority' : 'Medium Priority';
        // newAssignment.string = newAssignment.due + " " + newAssignment.course + " " + newAssignment.text + " (" + newAssignment.priority + ")";
        newAssignment.string =
          newAssignment.due +
          " " +
          newAssignment.course +
          " " +
          newAssignment.text;
        assignments = [newAssignment, ...assignments];
      });
      setTasks((tasks) => [...assignments, ...tasks]);
      setCourses(courseList);
    };

    fetchData();
  }, []);

  return (
    <>
      <VRScene score={score} />
      <div>
        <div className="main-view">
          {
            <div
              className="task-manager-tab"
              style={{
                display: currentMenu === "Tasks" ? "block" : "none",
              }}
            >
              <TaskManager
                tasks={tasks}
                setTasks={setTasks}
                courses={courses}
                docRef={docRef}
              />
            </div>
          }
          {
            <div
              className="profile-tab"
              style={{
                display: currentMenu === "Profile" ? "block" : "none",
              }}
            >
              <Profile
                score={score}
                setScore={setScore}
                docRef={docRef}
                setDocRef={setDocRef}
              />
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
    </>
  );
}

export default App;
