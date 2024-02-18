import React from "react";

import CourseList from "./CourseList";

const Course = ({ students, course, tutor }) => {
  return (
    <div>
      <h2 className="mb-3 mt-10 text-3xl font-bold">{course}</h2>
      <CourseList students={students} tutor={tutor} />
    </div>
  );
};

export default Course;
