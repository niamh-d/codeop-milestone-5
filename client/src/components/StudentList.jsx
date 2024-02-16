import React from "react";

import Student from "./Student";

const StudentList = ({ students, course }) => {
  const filteredStudents = students.filter(
    student => student.course === course
  );

  return (
    <ul className="flex flex-col p-5">
      <li>
        {filteredStudents.map(student => (
          <Student key={student.id} student={student} />
        ))}
      </li>
    </ul>
  );
};

export default StudentList;
