import React, { useState } from "react";
import TaskEntry from "./TaskEntry";
import { RiCloseCircleLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";

function TaskList({ tasks, completeTask, removeTask, updateTask }) {
  const [edit, setEdit] = useState({
    id: null,
    value: "",
  });

  const submitUpdate = (value) => {
    updateTask(edit.id, value);
    setEdit({
      id: null,
      value: "",
    });
  };

  if (edit.id) {
    return <TaskEntry edit={edit} onSubmit={submitUpdate} />;
  }

  return tasks.map((task, index) => (
    <div
      className={
        "task-row" +
        (task.isComplete ? " complete" : "") +
        (task.custom ? " custom" : "") +
        (task.courseIndex != null ? " courseIndex" + task.courseIndex : "")
      }
      key={index}
    >
      <div
        style={{ display: "flex", flexDirection: "vertical" }}
        key={task.id}
        onClick={() => completeTask(task.id)}
      >
        <b>
          {task.course != null ? "[" + task.course.substring(0, 10) + "]" : ""}
        </b>
        &nbsp;
        <p>{task.text}</p>
      </div>

      <div className="icons">
        <RiCloseCircleLine
          onClick={() => removeTask(task.id)}
          className="delete-icon"
        />
        <TiEdit
          onClick={() => setEdit({ id: task.id, value: task.text })}
          className="edit-icon"
        />
      </div>
    </div>
  ));
}

export default TaskList;
