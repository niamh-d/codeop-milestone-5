import React from "react";

import StudentTableRow from "./StudentTableRow";

const Table = ({ students }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Surname</th>
            <th>Course</th>
            <th>Sex</th>
            <th>Date of Birth</th>
            <th>Scholarship</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <StudentTableRow key={student.id} student={student} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
