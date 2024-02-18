/* eslint-disable react/prop-types */
import { createContext, useContext, useReducer, useEffect } from "react";

const StudentsContext = createContext();

const initialState = {
  studentsArr: [],
  activeView: "courses-list", // "courses-list" = default, alt: "table-view"
  profiledPersonId: null,
  studentToRemoveId: null,
  showForm: false,
  profiledPerson: null,
  displayedCourse: "French 101",
  tutorsArr: [],
  coursesArr: [],
  displayedTutor: null,
  filteredTableStudents: null,
  removedStudent: null,
  addedStudent: null
};

let modalDelete;
let modalDeleteInfo;
let modalAddInfo;

function generateIdStr(person, student = true) {
  if (!student)
    return `${person.id}${person.lastName[0]}${person.firstName[0]}`;
  else return `24${person.lastName[0]}${person.firstName[0]}${person.id}`;
}

function applyIdStrs(arr) {
  return arr.map(item => {
    return { ...item, stringId: generateIdStr(item) };
  });
}

function reducer(state, action) {
  switch (action.type) {
    case "RESET":
      return {
        ...state,
        studentToRemoveId: null,
        removedStudent: null,
        addedStudent: null
      };
    case "TOGGLE_VIEW":
      const view =
        state.activeView === "courses-list" ? "table-view" : "courses-list";

      return {
        ...state,
        activeView: view
      };
    case "TOGGLE_SHOW_FORM":
      const isOpen = !state.showForm;
      return {
        ...state,
        showForm: isOpen,
        profiledPersonId: null,
        profiledPerson: null
      };
    case "SET_TABLE_FILTERED_STUDENTS":
      return {
        ...state,
        filteredTableStudents: action.payload
      };
    case "RESET_TABLE":
      return {
        ...state,
        filteredTableStudents: null
      };
    case "SET_STUDENTS":
      return {
        ...state,
        studentsArr: action.payload,
        showForm: false
      };
    case "SET_COURSES":
      return {
        ...state,
        coursesArr: action.payload
      };
    case "SET_TUTORS":
      return {
        ...state,
        tutorsArr: action.payload
      };
    case "UNSET_PROFILED_ID":
      return {
        ...state,
        profiledPersonId: null,
        profiledPerson: null
      };
    case "SET_PROFILED_ID":
      return {
        ...state,
        profiledPersonId: action.payload
      };
    case "SET_PROFILED_PERSON":
      return {
        ...state,
        profiledPerson: action.payload
      };
    case "SET_DISPLAYED_TUTOR":
      return {
        ...state,
        displayedTutor: action.payload
      };
    case "SET_DISPLAYED_COURSE":
      const course =
        state.displayedCourse === action.payload
          ? "French 101"
          : action.payload;
      return {
        ...state,
        displayedCourse: course
      };
    case "SET_ADDED_STUDENT":
      return {
        ...state,
        addedStudent: action.payload
      };
    case "SET_REMOVE_ID":
      const remStud = state.studentsArr.filter(
        student => student.id === action.payload
      )[0];
      remStud.stringId = generateIdStr(remStud);
      return {
        ...state,
        removedStudent: remStud,
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
      profiledPersonId,
      studentToRemoveId,
      showForm,
      profiledPerson,
      displayedCourse,
      tutorsArr,
      coursesArr,
      displayedTutor,
      filteredTableStudents,
      removedStudent,
      addedStudent
    },
    dispatch
  ] = useReducer(reducer, initialState);

  useEffect(
    function() {
      async function fetchDisplayedTutor() {
        try {
          const res = await fetch(`/api/courses/tutor/${displayedCourse}`);
          const data = await res.json();

          const tutor = {
            ...data,
            stringId: generateIdStr(data)
          };

          dispatch({ type: "SET_DISPLAYED_TUTOR", payload: tutor });
        } catch (err) {
          console.error(err);
        }
      }
      fetchDisplayedTutor();
    },
    [displayedCourse]
  );

  useEffect(
    function() {
      async function fetchProfiledPerson() {
        try {
          const isStudent = profiledPersonId.toString().slice(0, 2) === "15";

          let res;
          if (isStudent) {
            res = await fetch(`/api/students/${profiledPersonId}`);
          } else res = await fetch(`/api/tutors/${profiledPersonId}`);

          const data = await res.json();

          const person = {
            ...data,
            stringId: generateIdStr(data, isStudent)
          };

          dispatch({ type: "SET_PROFILED_PERSON", payload: person });
        } catch (err) {
          console.error(err);
        }
      }
      if (!profiledPersonId) return;
      fetchProfiledPerson();
    },
    [profiledPersonId]
  );

  useEffect(function() {
    async function fetchStudents() {
      try {
        const res = await fetch("/api/students");
        const data = await res.json();

        const students = applyIdStrs(data);

        dispatch({ type: "SET_STUDENTS", payload: students });
      } catch (err) {
        console.error(err);
      }
    }
    fetchStudents();
  }, []);

  useEffect(function() {
    async function fetchTutors() {
      try {
        const res = await fetch("/api/tutors");
        const data = await res.json();

        const tutors = data.map(tutor => {
          return { ...tutor, stringId: generateIdStr(tutor, false) };
        });

        dispatch({ type: "SET_TUTORS", payload: tutors });
      } catch (err) {
        console.error(err);
      }
    }
    fetchTutors();
  }, []);

  useEffect(function() {
    async function fetchCourses() {
      try {
        const res = await fetch("/api/courses");
        const data = await res.json();

        dispatch({ type: "SET_COURSES", payload: data });
      } catch (err) {
        console.error(err);
      }
    }
    fetchCourses();
  }, []);

  async function addStudent(student) {
    try {
      const lastId = studentsArr.at(-1).id;
      const strId = `24${student.firstName[0]}${student.lastName[0]}${Number(
        lastId
      ) + 1}`;
      dispatch({
        type: "SET_ADDED_STUDENT",
        payload: { ...student, stringId: strId }
      });

      const res = await fetch("/api/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(student)
      });
      const data = await res.json();

      const students = applyIdStrs(data);

      dispatch({ type: "SET_STUDENTS", payload: students });

      modalAddInfo = document.getElementById("modal-info_add");
      modalAddInfo.showModal();
    } catch (err) {
      console.error(err);
    }
  }

  function toggleStudentToRemoveId(id = null) {
    dispatch({ type: "SET_REMOVE_ID", payload: id });

    if (id) {
      modalDelete = document.getElementById("modal_delete");
      modalDelete.showModal();
    }
  }

  async function removeStudent() {
    try {
      if (studentToRemoveId === profiledPersonId)
        dispatch({ type: "UNSET_PROFILED_ID" });

      const res = await fetch(`/api/students/${studentToRemoveId}`, {
        method: "DELETE"
      });
      const data = await res.json();

      const students = applyIdStrs(data);

      dispatch({ type: "SET_STUDENTS", payload: students });

      modalDeleteInfo = document.getElementById("modal-info_delete");
      modalDeleteInfo.showModal();
    } catch (err) {
      console.error(err);
    }
  }

  async function fetchFilteredTableStudents(criteria) {
    try {
      const { sex, course } = criteria;

      if (sex === "all" && course === "all") dispatch({ type: "RESET_TABLE" });
      else {
        const res = await fetch(`/api/students/f/${sex},${course}`);
        const data = await res.json();

        const students = applyIdStrs(data);

        dispatch({ type: "SET_TABLE_FILTERED_STUDENTS", payload: students });
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <StudentsContext.Provider
      value={{
        studentsArr,
        activeView,
        profiledPersonId,
        showForm,
        dispatch,
        studentToRemoveId,
        profiledPerson,
        displayedCourse,
        tutorsArr,
        coursesArr,
        displayedTutor,
        fetchFilteredTableStudents,
        filteredTableStudents,
        toggleStudentToRemoveId,
        removeStudent,
        removedStudent,
        addStudent,
        addedStudent
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
