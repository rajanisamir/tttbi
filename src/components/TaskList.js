import React, { useState } from "react";
import TaskEntry from "./TaskEntry";
import { RiCloseCircleLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";
import moment from 'moment';
moment().format();

// const assignmentScore = 0;

function TaskList({ tasks, completeTask, removeTask, updateTask }) {
  const [edit, setEdit] = useState({
    id: null,
    value: "",
  });

  var assignmentScore;

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

  // keeps items with no deadline to place them at top of list
  const todo = tasks.filter(task => {
    if (!task.due)
      return true;
  })
  // sort tasks by date
  const sortedtasks = tasks.slice().sort((a, b) => b.due > a.due ? -1: 1);
  // filter out past due assignments --> may change this to completed assignments later
  const currtasks = sortedtasks.filter(task => {
    if (moment(task.due) > moment())
      return true;
  })
  global.assignmentScore = (tasks.length - currtasks.length)*5;

  const alltasks = todo.concat(currtasks);

  return alltasks.map((task, index) => (
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
        <p>{task.due ? moment(task.due).format('MM-DD hh:mm a') : ''}</p>
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
