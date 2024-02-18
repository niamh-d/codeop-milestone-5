import React, { useRef, useState } from "react";

const TableFilter = ({ courses, fetchFiltered, dispatch }) => {
  const sexSelectRef = useRef(null);
  const courseSelectRef = useRef(null);

  const [filterState, setFilterState] = useState(false);

  function reset() {
    sexSelectRef.current.value = "all";
    courseSelectRef.current.value = "all";
    dispatch({ type: "RESET_TABLE" });
  }

  const onResetHandler = e => {
    e.preventDefault();

    reset();
  };

  const onChangeHandler = () => {
    setFilterState(true);
  };

  const onFilterHandler = e => {
    e.preventDefault();
    const criteria = {
      sex: sexSelectRef.current.value,
      course: courseSelectRef.current.value
    };

    console.log(criteria);
    fetchFiltered(criteria);
  };

  return (
    <form className="mb-10 flex items-center gap-3">
      <div className="flex items-center gap-5">
        <select
          onChange={onChangeHandler}
          className="select select-secondary w-full max-w-xs text-lg"
          ref={sexSelectRef}
        >
          <option value="all">All Sexes</option>
          <option value="M">Male</option>
          <option value="F">Female</option>
          <option value="N">Non binary</option>
          <option value="O">Other/Not specified</option>
        </select>

        <select
          className="select select-secondary w-full max-w-xs text-lg"
          ref={courseSelectRef}
          onChange={onChangeHandler}
        >
          <option value="all">All Courses</option>
          {courses.map(course => (
            <option value={course} key={course}>
              {course}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          className={`btn btn-secondary ml-3 ${
            !filterState ? "btn-disabled" : null
          }`}
          onClick={onFilterHandler}
        >
          Filter
        </button>
        <button
          type="button"
          className={`btn btn-ghost ml-3 ${
            !filterState ? "btn-disabled invisible" : null
          }`}
          onClick={onResetHandler}
        >
          Reset
        </button>
      </div>
    </form>
  );
};

export default TableFilter;
