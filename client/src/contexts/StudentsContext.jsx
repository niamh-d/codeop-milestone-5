/* eslint-disable react/prop-types */
import { createContext, useContext, useReducer, useEffect } from "react";

const StudentsContext = createContext();

const initialState = {
  studentsArr: [],
  activeView: "student-list", // student-list = default, alt: table-view
  profiledStudentId: null,
  studentToRemoveId: null,
  showForm: false,
  profiledStudent: null
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_STUDENTS":
      return {
        ...state,
        studentsArr: action.payload
      };
    case "SET_PROFILED_ID":
      return {
        ...state,
        profiledStudentId: action.payload
      };
    case "SET_PROFILED_STUDENT":
      return {
        ...state,
        profiledStudent: action.payload
      };
    case "SET_DELETE_ID":
      return {
        ...state,
        studentToRemoveId: action.payload
      };
    default:
      throw new Error("Unknown action type");
  }
}

function StudentsProvider({ children }) {
  const [
    {
      studentsArr,
      activeView,
      profiledStudentId,
      studentToRemoveId,
      showForm,
      profiledStudent
    },
    dispatch
  ] = useReducer(reducer, initialState);

  useEffect(
    function() {
      async function fetchProfiledStudent() {
        try {
          const res = await fetch(`/api/students/${profiledStudentId}`);
          const data = await res.json();
          dispatch({ type: "SET_PROFILED_STUDENT", payload: data });
        } catch (err) {
          console.error(err);
        }
      }
      if (!profiledStudentId) return;
      fetchProfiledStudent();
    },
    [profiledStudentId]
  );

  useEffect(function() {
    async function fetchStudents() {
      try {
        const res = await fetch("/api/students");
        const data = await res.json();
        dispatch({ type: "SET_STUDENTS", payload: data });
      } catch (err) {
        console.error(err);
      }
    }
    fetchStudents();
  }, []);

  async function addStudent(student) {
    try {
      const res = await fetch("/api/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(student)
      });
      const data = await res.json();
      dispatch({ type: "SET_STUDENTS", payload: data });
    } catch (err) {
      console.error(err);
    }
  }

  async function deleteStudent() {
    try {
      const res = await fetch(`/api/students/${id}`, {
        method: "DELETE"
      });
      const data = await res.json();
      dispatch({ type: "SET_STUDENTS", payload: data });
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <StudentsContext.Provider
      value={{
        studentsArr,
        addStudent,
        deleteStudent,
        activeView,
        profiledStudentId,
        showForm,
        dispatch,
        studentToRemoveId,
        profiledStudent
      }}
    >
      {children}
    </StudentsContext.Provider>
  );
}

function useStudents() {
  const context = useContext(StudentsContext);

  if (context === undefined)
    throw new Error("StudentsContext used outside of StudentsProvider");
  return context;
}

export { StudentsProvider, useStudents };
