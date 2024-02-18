import React from "react";

import Course from "../Course";
import AddNewStudentForm from "../AddNewStudentForm";
import { useStudents } from "../../contexts/StudentsContext";
import PersonProfile from "../../components/PersonProfile";
import DeleteModal from "../DeleteModal";
import InfoModal from "../InfoModal";

const CoursesView = () => {
  const {
    showForm,
    studentsArr,
    profiledPerson,
    dispatch,
    displayedCourse,
    coursesArr,
    displayedTutor,
    removedStudent,
    addedStudent
  } = useStudents();

  const selectedStudentList = studentsArr.filter(
    student => student.course === displayedCourse
  );

  const setCourseHandler = course =>
    dispatch({ type: "SET_DISPLAYED_COURSE", payload: course });

  return (
    <>
      <DeleteModal />
      <InfoModal dispatch={dispatch} student={removedStudent} type="delete" />
      <InfoModal dispatch={dispatch} student={addedStudent} type="add" />

      <div className="mt-10">
        <div className="flex gap-6">
          {coursesArr.map(course => (
            <div
              className={`cursor-pointer badge badge-${
                course.title === displayedCourse ? "neutral" : "secondary"
              } text-xl p-5`}
              key={course.title}
              onClick={() => setCourseHandler(course.title)}
            >
              {course.title}
            </div>
          ))}
        </div>

        <div className="courses">
          <Course
            students={selectedStudentList}
            course={displayedCourse}
            tutor={displayedTutor}
          />
          {profiledPerson && (
            <PersonProfile
              profiledPerson={profiledPerson}
              dispatch={dispatch}
            />
          )}
          {showForm && <AddNewStudentForm />}
        </div>
      </div>
    </>
  );
};

export default CoursesView;
