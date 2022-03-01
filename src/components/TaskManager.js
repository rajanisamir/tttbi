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
    <div style={{ overflow: "scroll", maxHeight: "450px" }}>
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
