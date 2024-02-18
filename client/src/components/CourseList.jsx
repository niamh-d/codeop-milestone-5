import React from "react";

import CourseListRow from "./CourseListRow";

const CourseList = ({ students, tutor }) => {
  return (
    <ul className="flex flex-col p-5">
      {tutor && (
        <li>
          <CourseListRow key={tutor.id} person={tutor} />
        </li>
      )}

      {students.map(student => (
        <li key={student.id}>
          <CourseListRow person={student} />
        </li>
      ))}
    </ul>
  );
};

export default CourseList;
