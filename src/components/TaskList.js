import React, { useEffect, useState } from "react";
import TaskListItem from "./TaskListItem";
import { IoMdArrowRoundDown, IoMdArrowRoundUp } from "react-icons/io";
import moment from "moment";

function TaskList({ tasks, completeTask, removeTask, updateTask }) {
  const [filterDate, setFilterDate] = useState(true);
  const [categoryNames, setCategoryNames] = useState([
    "All Categories",
    "Personal",
  ]);
  const [filterOption, setFilterOption] = useState("All Categories");

  const sortTasks = (descending, taskList) => {
    // todo keeps track of items without deadlines.
    const todo = taskList.filter((task) => !task.due);

    // sortedTasks is a sorted list of tasks
    var sortedTasks = [];
    if (descending) {
      sortedTasks = taskList.slice().sort((a, b) => (b.due > a.due ? -1 : 1));
    } else {
      sortedTasks = taskList.slice().sort((a, b) => (b.due > a.due ? 1 : -1));
    }

    // currTasks contains only tasks whose deadlines have not passed
    const currTasks = sortedTasks.filter((task) => moment(task.due) > moment());

    // global.assignmentScore = (taskList.length - currTasks.length) * 5;
    // shouldn't really be doing it this way...

    return todo.concat(currTasks);
  };

  const getFilteredTasks = () => {
    if (filterOption === "All Categories") {
      return tasks;
    } else {
      return tasks.filter((task) => {
        const taskName = task.course
          ? task.course.substring(0, 10)
          : "Personal";
        return taskName === filterOption;
      });
    }
  };

  useEffect(() => {
    tasks.forEach((task) => {
      const taskCategory = task.course
        ? task.course.substring(0, 10)
        : "Personal";
      if (categoryNames.indexOf(taskCategory) === -1) {
        setCategoryNames([...categoryNames, taskCategory]);
      }
    });
  }, [tasks, categoryNames]);

  function onFilterDate() {
    setFilterDate(!filterDate);
  }

  const onFilterCategories = (event) => {
    setFilterOption(event.target.value);
  };

  return (
    <>
      <button className="filter-button" onClick={onFilterDate}>
        Date &nbsp;
        {filterDate ? <IoMdArrowRoundDown /> : <IoMdArrowRoundUp />}
      </button>
      &nbsp;&nbsp;
      <select className="filter-button" onChange={onFilterCategories}>
        {categoryNames.map((option) => (
          <option value={option}>{option}</option>
        ))}
      </select>
      {sortTasks(filterDate, getFilteredTasks()).map((task, index) => (
        <TaskListItem
          task={task}
          index={index}
          completeTask={completeTask}
          removeTask={removeTask}
          updateTask={updateTask}
        />
      ))}
    </>
  );
}

export default TaskList;
