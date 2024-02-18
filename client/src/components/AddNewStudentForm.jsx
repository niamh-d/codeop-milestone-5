import React, { useRef } from "react";

import { useStudents } from "../contexts/StudentsContext";

function generatePhotoCode() {
  function randnum() {
    return alphas[Math.floor(Math.random() * 27)];
  }
  const alphas = [...Array(26)].map((_, i) => String.fromCharCode(i + 97));
  return [randnum(), randnum(), randnum()].join("");
}

function convertToInt(str) {
  return Number(str.replaceAll("-", ""));
}

const AddNewStudentForm = () => {
  const firstNameInputRef = useRef();
  const lastNameInputRef = useRef();
  const sexSelectRef = useRef();
  const courseSelectRef = useRef();
  const dobInputRef = useRef();
  const scholarshipSelectRef = useRef();

  const { coursesArr, dispatch, addStudent } = useStudents();

  const courses = coursesArr.map(course => course.title);

  const handleSubmit = e => {
    e.preventDefault();

    if (firstNameInputRef.current.value.length < 3) {
      firstNameInputRef.current.style.backgroundColor = "#FA8072";
      return;
    }

    if (lastNameInputRef.current.value.length < 3) {
      lastNameInputRef.current.style.backgroundColor = "#FA8072";
      return;
    }

    if (dobInputRef.current.value.length !== 10) {
      dobInputRef.current.style.backgroundColor = "#FA8072";
      return;
    }

    const student = {
      firstName: firstNameInputRef.current.value.trim(),
      lastName: lastNameInputRef.current.value.trim(),
      sex: sexSelectRef.current.value,
      course: courseSelectRef.current.value,
      dob: convertToInt(dobInputRef.current.value),
      scholarship: scholarshipSelectRef.current.value,
      photo: generatePhotoCode()
    };
    addStudent(student);
  };

  const toggleShowFormHandler = () => dispatch({ type: "TOGGLE_SHOW_FORM" });

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-4/5">
      <div className="grid grid-cols-2 items-center">
        <label htmlFor="first-name">First name:</label>
        <input
          id="first-name"
          type="text"
          placeholder="Type here"
          className="input w-full max-w-xs text-xl"
          ref={firstNameInputRef}
        />
      </div>

      <div className="grid grid-cols-2 items-center">
        <label htmlFor="surname">Surname:</label>
        <input
          id="surname"
          type="text"
          placeholder="Type here"
          className="input w-full max-w-xs text-xl"
          ref={lastNameInputRef}
        />
      </div>

      <div className="grid grid-cols-2 items-center">
        <label htmlFor="sex">Sex:</label>
        <select
          defaultValue="0"
          id="sex"
          className="select select-ghost w-full max-w-xs text-xl"
          ref={sexSelectRef}
        >
          <option disabled value="0">
            Select from drop down
          </option>
          <option value="M">Male</option>
          <option value="F">Female</option>
          <option value="N">Non binary</option>
          <option value="O">Other/Not specified</option>
        </select>
      </div>

      <div className="grid grid-cols-2 items-center">
        <label htmlFor="course">Course:</label>
        <select
          defaultValue="0"
          id="course"
          className="select select-ghost w-full max-w-xs text-xl"
          ref={courseSelectRef}
        >
          <option disabled value="0">
            Select from drop down
          </option>
          {courses.map(course => (
            <option value={course} key={course}>
              {course}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 items-center">
        <label htmlFor="dob">Date of birth:</label>
        <input
          id="dob"
          type="text"
          placeholder="2000-01-01"
          className="input w-full max-w-xs text-xl"
          ref={dobInputRef}
        />
      </div>
      <div className="grid grid-cols-2 items-center">
        <label htmlFor="scholarship">Scholarship decision:</label>
        <select
          defaultValue="0"
          id="scholarship"
          className="select select-ghost w-full max-w-sm text-xl"
          ref={scholarshipSelectRef}
        >
          <option value="0">Not applicable</option>
          <option value="1">Granted</option>
        </select>
      </div>
      <div className="flex gap-3 items-center mt-10">
        <button
          type="submit"
          className="btn btn-secondary w-44 font-bold"
          onClick={handleSubmit}
        >
          Add student
        </button>
        <button
          type="submit"
          className="btn btn-ghost w-66 font-normal"
          onClick={toggleShowFormHandler}
        >
          Close (without submitting)
        </button>
      </div>
    </form>
  );
};

export default AddNewStudentForm;
