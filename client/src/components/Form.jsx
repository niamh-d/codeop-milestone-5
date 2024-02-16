import React, { useRef } from "react";

import { useStudents } from "../contexts/StudentsContext";

const Form = () => {
  const { addStudent } = useStudents();

  const inputRef = useRef(null);

  const handleSubmit = e => {
    e.preventDefault();

    addStudent(inputRef.current.value);
    inputRef.current.value = null;
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        New Task:
        <input ref={inputRef} />
      </label>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default Form;
