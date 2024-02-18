import React from "react";

import { useStudents } from "../../contexts/StudentsContext";
import Table from "../Table";
import TableFilter from "../TableFilter";

const TableView = () => {
  const {
    studentsArr,
    fetchFilteredTableStudents,
    coursesArr,
    filteredTableStudents,
    dispatch
  } = useStudents();

  const courses = coursesArr.map(course => course.title);

  const filteredStudents = filteredTableStudents
    ? filteredTableStudents
    : studentsArr;

  return (
    <div>
      <TableFilter
        fetchFiltered={fetchFilteredTableStudents}
        courses={courses}
        dispatch={dispatch}
      />
      {filteredStudents.length > 0 && <Table students={filteredStudents} />}
      {filteredStudents.length === 0 && (
        <p className="text-xl">No students were found matching your filter.</p>
      )}
    </div>
  );
};

export default TableView;
