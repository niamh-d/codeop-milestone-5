import React from "react";

import Course from "../Course";
import { useStudents } from "../../contexts/StudentsContext";
import StudentProfile from "../../components/StudentProfile";

const CoursesView = () => {
  const { studentsArr, profiledStudent } = useStudents();

  const courses = Array.from(
    new Set(studentsArr.map(student => student.course))
  );

  return (
    <div className="courses-view">
      <div className="courses">
        {courses.map(course => (
          <Course students={studentsArr} course={course} key={course} />
        ))}
      </div>
      {profiledStudent && <StudentProfile profiledStudent={profiledStudent} />}
    </div>
  );
};

export default CoursesView;
