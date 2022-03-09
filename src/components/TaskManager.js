import React, { useState } from "react";
import TaskEntry from "./TaskEntry";
import TaskList from "./TaskList";
import { updateDoc, increment } from "firebase/firestore";

function TaskManager({ tasks, setTasks, courses, docRef, score }) {
  const addTask = (task) => {
    if (!task.text || /^\s*$/.test(task.text)) {
      return;
    }
    task.courseIndex = courses.indexOf(task.course);
    const newTasks = [task, ...tasks];
    setTasks(newTasks);
  };

  const removeTask = (id) => {
    const removeArr = tasks.filter((task) => task.id !== id);
    setTasks(removeArr);
  };

  const updateTask = (id, newValue) => {
    tasks[tasks.findIndex((task) => task.id === id)] = newValue;
    setTasks(tasks);
  };

  const completeTask = (id) => {
    let custom;
    let updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        task.isComplete = !task.isComplete;
        custom = task.custom ? true : false;
      }
      return task;
    });
    setTasks(updatedTasks);
    if (score !== -1) {
      updateDoc(docRef, { score: custom ? increment(2) : increment(5) });
    }
  };

  const [categoryNames, setCategoryNames] = useState([
    "All Categories",
    "[Personal]",
  ]);

  return (
    <div style={{ overflow: "scroll", maxHeight: 0.75 * window.innerHeight }}>
      <h1>Your Tasks</h1>
      <TaskEntry onSubmit={addTask} categoryNames={categoryNames} />
      <TaskList
        tasks={tasks}
        setTasks={setTasks}
        completeTask={completeTask}
        removeTask={removeTask}
        updateTask={updateTask}
        onSubmit={addTask}
        categoryNames={categoryNames}
        setCategoryNames={setCategoryNames}
      />
    </div>
  );
}

export default TaskManager;
