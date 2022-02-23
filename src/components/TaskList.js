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
      onClick={() => completeTask(task.id)}
      key={index}
    >
      <div>
        <b>{task.course != null ? task.course.substring(0, 10) : ""}</b>
      </div>
      <div>{task.text}</div>
      <div className="task-row-date-icons">
        <p>
          {task.dueDate
            ? task.dueDate.getUTCMonth() +
              1 +
              "/" +
              task.dueDate.getUTCDate() +
              "/" +
              task.dueDate.getUTCFullYear() +
              ", " +
              task.dueDate.getUTCHours() +
              ":" +
              ("0" + task.dueDate.getUTCMinutes()).slice(-2)
            : ""}
        </p>
        <div className="task-row-icons">
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
    </div>
  ));
}

export default TaskList;
