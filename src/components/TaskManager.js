import React, { useState, useEffect } from "react";
import TaskEntry from "./TaskEntry";
import TaskList from "./TaskList";
import axios from "axios";

function TaskManager() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const url =
      "https://pyq1flh805.execute-api.us-east-1.amazonaws.com/test/assignments";

    const fetchData = async () => {
      console.log("fetching...");
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
          dueDate: new Date(assignment.Due),
          course: assignment.Course,
          text: assignment.Name,
          id: assignment.ID,
          custom: false,
          courseIndex: courses.indexOf(assignment.Course),
        };
        assignments = [newAssignment, ...assignments];
        console.log(newAssignment);
      });
      setTasks((tasks) => [...assignments, ...tasks]);
    };

    fetchData();
  }, []);

  const addTask = (task) => {
    if (!task.text || /^\s*$/.test(task.text)) {
      return;
    }
    const newTasks = [task, ...tasks];
    setTasks(newTasks);
  };

  const removeTask = (id) => {
    // why spread here?
    const removeArr = [...tasks].filter((task) => task.id !== id);
    setTasks(removeArr);
  };

  const updateTask = (id, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }

    setTasks((prev) => prev.map((item) => (item.id === id ? newValue : item)));
  };

  const completeTask = (id) => {
    let updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        task.isComplete = !task.isComplete;
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  return (
    <div>
      <h1>Your Tasks</h1>
      <TaskEntry onSubmit={addTask} />
      <TaskList
        tasks={tasks}
        completeTask={completeTask}
        removeTask={removeTask}
        updateTask={updateTask}
      />
    </div>
  );
}

export default TaskManager;
