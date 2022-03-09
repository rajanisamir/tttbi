import React, { useState, useEffect, useRef } from "react";
import moment from "moment";

function TaskEntry({ onSubmit, categoryNames }) {
  const [input, setInput] = useState("");
  const [dateInput, setDateInput] = useState("");
  const [categoryInput, setCategoryInput] = useState("All Categories");

  const onCategoryInput = (event) => {
    setCategoryInput(event.target.value);
  };

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleDateChange = (e) => {
    setDateInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const task = {
      id: Math.floor(Math.random() * 100000),
      text: input,
      custom: true,
      due: dateInput,
      string: "",
      course: categoryInput,
    };

    const dateString = task.due
      ? moment(task.due).format("MMM DD, hh:mm a")
      : "";
    const courseString =
      task.course != null
        ? "[" + task.course.substring(0, 10) + "]"
        : "[Personal]";
    task.string = dateString + " " + courseString + " " + task.text;
    // REDO ID
    onSubmit(task);

    setInput("");
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder={"Add a custom task"}
        value={input}
        name="text"
        className="task-input"
        onChange={handleChange}
        ref={inputRef}
      />
      
      <input
        type="date"
        name="due-date"
        className="task-date-input"
        onChange={handleDateChange}
      />

      <select className="category-select" onChange={onCategoryInput} >
        {categoryNames.map((option) => (
          <option value={option}>{option}</option>
        ))}
      </select>

      <button className="task-input-submit">Add Task</button>
    </form>
  );
}

export default TaskEntry;
