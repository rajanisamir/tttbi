import React, { useState, useEffect } from "react";
import { BsTrash } from "react-icons/bs";
import { TiEdit } from "react-icons/ti";
import { AiFillCheckCircle } from "react-icons/ai";
import moment from "moment";
moment().format();

/* task list interface */
function TaskListItem({ task, index, completeTask, removeTask, updateTask }) {
  const [edit, setEdit] = useState({
    id: null,
    value: "",
  });

  const [viewMode, setViewMode] = useState(true);

  const editTask = (task) => {
    setEdit({ id: task.id, value: task.string });
    viewMode ? setViewMode(false) : setViewMode(true);
  };

  const handleUpdatedDone = (event) => {
    if (event.key === "Enter") {
      updateTask(edit.id, edit.value);
      setEdit({
        id: null,
        value: "",
      });
      setViewMode(true);
    }
  }

  return <> 
    <div
      className={ 
        "task-row" +
        (task.isComplete ? " complete" : "") +
        (task.custom ? " custom" : "") +
        (task.courseIndex != null ? " courseIndex" + task.courseIndex : "")
      }
      // This prevents you from removing a task at the moment.
      // onClick={() => completeTask(task.id)}
      key={index}
    >
      <div
        style={{ flexDirection: "vertical" }, viewMode ? {display: "flex"} : {display: "none"}}
        key={task.id}
      >
          <p>{task.string.split("[")[0]}</p>
          &nbsp;
          <b>
            {"["+task.string.split("[")[1].split("]")[0]+"]"}
          </b>
          &nbsp;
          <p>{task.string.split("]")[1]}</p>
      </div>
      <div
        style={{ flexDirection: "vertical" }, viewMode ? {display: "none"} : {display: "flex"}}
      >
        <input 
            type="text"
            // style={{flexDirection: "vertical", width: "100"}}
            // cannot figure out how to get the input box to have flex width
            style={{width: "100%", flex:"1"}}
            value={edit.value}
            onChange={e => {
              setEdit({ id: task.id, value: e.target.value });
            }}
            onKeyDown={handleUpdatedDone}
          />
        </div>
      <div className="task-row-date-icons">
        <div className="task-row-icons">
          <AiFillCheckCircle
            onClick={() => completeTask(task.id)}
            className="delete-icon"
          />
          <TiEdit
            onClick={() => editTask(task)}
            className="delete-icon"
          />
          <BsTrash
            onClick={() => removeTask(task.id)}
            className="delete-icon"
          />
        </div>
      </div>
    </div>
  </>;
}

export default TaskListItem;
