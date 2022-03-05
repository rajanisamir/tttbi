import React, { useState, useCallback } from "react";
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
    console.log(newValue);
    // if (!newValue.text || /^\s*$/.test(newValue.text)) {
    //   return;
    // }

    // setTasks((prev) => prev.map((item) => (item.id === id ? newValue : item)));
    tasks.find(item => item.id === id).string = newValue;
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
  
  const [editMode, setEditMode] = useState(false);
  const setEdit = useCallback((state) => {
    setEditMode(state);
  }, [setEditMode]);

  const [selectedTask, setSelectedTask] = useState(false);
  const setTask = useCallback((state) => {
    setSelectedTask(state);
  }, [setSelectedTask]);

  return (
    <div style={{ overflow: "scroll", maxHeight: "450px" }}>
      <h1>Your Tasks</h1>
      <TaskEntry 
        editMode={editMode} 
        onSubmit={addTask} 
        setEditMode={setEdit}
        selectedTask={selectedTask}
      />
      <TaskList
        tasks={tasks}
        completeTask={completeTask}
        removeTask={removeTask}
        updateTask={updateTask}
        onSubmit={addTask}
        editMode={editMode}
        setEditMode={setEdit}
        setTask={setTask}
      />
      
    </div>
  );
}

export default TaskManager;
