import React, { useState, useEffect, useRef } from "react";

function TaskEntry(props) {
  const [input, setInput] = useState("");
  const [dateInput, setDateInput] = useState("");

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

    // REDO ID
    props.onSubmit({
      id: Math.floor(Math.random() * 100000),
      text: input,
      custom: true,
      due: dateInput,
    });

    setInput("");
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a custom task"
        value={input}
        name="text"
        className="task-input"
        onChange={handleChange}
        ref={inputRef}
      />
      <button className="task-input-submit">Add Task</button>
      <input
        type="date"
        name="due-date"
        className="task-date-input"
        onChange={handleDateChange}
      />
    </form>
  );
}

export default TaskEntry;
