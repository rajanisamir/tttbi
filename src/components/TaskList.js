import React, { useState, useEffect } from "react";
import TaskListItem from "./TaskListItem";
import { IoMdArrowRoundDown, IoMdArrowRoundUp } from "react-icons/io";
import moment from "moment";
moment().format();

/* task list interface */
function TaskList({ tasks, completeTask, removeTask, updateTask, editMode, setEditMode, setTask }) {

  const [filterDate, setFilterDate] = useState(true);

  const [allTasks, setTasks] = useState([]);

  // default: tasks sorted by due date
  const sortTaskDates = (descending, taskList) => {
    // keeps items with no deadline to place them at top of list
    const todo = taskList.filter((task) => {
      return !task.due;
    });
    // sort tasks by date
    var sortedTasks = [];
    if (descending) {
      sortedTasks = taskList.slice().sort((a, b) => (b.due > a.due ? -1 : 1));
    } else {
      sortedTasks = taskList.slice().sort((a, b) => (b.due > a.due ? 1 : -1));
    }
    // filter out past due assignments --> may change this to completed assignments later
    const currTasks = sortedTasks.filter((task) => {
      return moment(task.due) > moment();
    });
    
    global.assignmentScore = (taskList.length - currTasks.length) * 5;
    return todo.concat(currTasks);
  };

  useEffect(() => {
    setTasks(sortTaskDates(true,tasks));
  }, [tasks]);

  function onFilterDate() {
    if (!filterDate) {
        setTasks(sortTaskDates(true,allTasks));
        setFilterDate(true);
    } else {
        setTasks(sortTaskDates(false,allTasks));
        setFilterDate(false);
      }
    }

  global.assignmentScore = 0;

  // if (editMode) {
  //   // setEditMode(true);
  //   return <TaskEntry edit={editMode} onSubmit={submitUpdate} setEditMode={setEditMode} />;
  // }
  // compile list of course names
  const courseNames = ["All Categories", "Personal"];
  tasks.forEach(task => {
      const taskName = task.course ? task.course.substring(0, 10) : "Personal";
      if (courseNames.indexOf(taskName) === -1) {
        courseNames.push(taskName);
      }
      const dateString = task.due ? moment(task.due).format("MMM DD, hh:mm a") : "";
      const courseString = task.course != null ? "[" + task.course.substring(0, 10) + "]" : "";
      task.string = dateString + " " + courseString + " " + task.text;
  });
  const handleChange = (event) => {
    const category = event.target.value;
    console.log(category);
    switch (category) {
      case "All Categories":
        setTasks(sortTaskDates(filterDate, tasks));
        break;
      default:
        setTasks(sortTaskDates(filterDate, tasks.filter((task) => {
          const taskName = task.course ? task.course.substring(0, 10) : "Personal";
          return taskName === category;
        })));
        break;
    }
  };

  return <> 
  <button className="filter-button" onClick={onFilterDate}>
    Date &nbsp;
    {filterDate ? <IoMdArrowRoundDown /> : <IoMdArrowRoundUp />}
  </button>
  &nbsp;&nbsp;
  <select className="filter-button" onChange={handleChange}> 
    {courseNames.map((option) => (
      <option value={option}>{option}</option>
    ))}
  </select>
  
  {allTasks.map((task, index) => (
  <TaskListItem 
    task={task} 
    index={index} 
    completeTask={completeTask} 
    removeTask={removeTask}
    updateTask={updateTask} />))}
  </>;
}

export default TaskList;
