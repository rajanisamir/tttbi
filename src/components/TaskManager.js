import React, { useState } from "react";
import TaskEntry from "./TaskEntry";
import TaskList from "./TaskList";

function TaskManager({ tasks, setTasks, courses }) {
  const addTask = (task) => {
    if (!task.text || /^\s*$/.test(task.text)) {
      return;
    }
    console.log(task.course,courses);
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
    let updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        task.isComplete = !task.isComplete;
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const [categoryNames, setCategoryNames] = useState([
    "All Categories",
    "Personal",
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
