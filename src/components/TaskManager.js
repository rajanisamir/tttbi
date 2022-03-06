import React from "react";
import TaskEntry from "./TaskEntry";
import TaskList from "./TaskList";

function TaskManager({ tasks, setTasks }) {
  const addTask = (task) => {
    if (!task.text || /^\s*$/.test(task.text)) {
      return;
    }
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

  return (
    <div style={{ overflow: "scroll", maxHeight: 0.75 * window.innerHeight }}>
      <h1>Your Tasks</h1>
      <TaskEntry onSubmit={addTask} />
      <TaskList
        tasks={tasks}
        setTasks={setTasks}
        completeTask={completeTask}
        removeTask={removeTask}
        updateTask={updateTask}
        onSubmit={addTask}
      />
    </div>
  );
}

export default TaskManager;
