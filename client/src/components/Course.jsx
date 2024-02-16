import React from "react";

import StudentList from "./StudentList";

const Course = ({ students, course }) => {
  return (
    <div>
      <h2 className="mb-3 mt-10 text-xl font-bold">{course}</h2>
      <StudentList students={students} course={course} />
    </div>
  );
};

export default Course;
