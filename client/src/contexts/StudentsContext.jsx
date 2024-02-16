/* eslint-disable react/prop-types */
import { createContext, useContext, useReducer, useEffect } from "react";

const StudentsContext = createContext();

const initialState = {
  studentsArr: [],
  activeView: "student-list", // student-list = default, alt: table-view
  profiledStudentId: null,
  showForm: false
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_STUDENTS":
      return {
        ...state,
        studentsArr: action.payload
      };
    default:
      throw new Error("Unknown action type");
  }
}

function StudentsProvider({ children }) {
  const [
    { studentsArr, activeView, profiledStudentId, showForm },
    dispatch
  ] = useReducer(reducer, initialState);

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
        showForm
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
