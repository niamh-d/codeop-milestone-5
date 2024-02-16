import "./App.css";

import Header from "./components/Header";
import Form from "./components/Form";
import Main from "./components/Main";
import CoursesView from "./components/views/CoursesView";
import StudentProfile from "./components/StudentProfile";
import TableView from "./components/views/TableView";

import { useStudents } from "./contexts/StudentsContext";

export default function App() {
  const { activeView, showForm } = useStudents();

  return (
    <div className="app">
      <Header />
      <Main>
        {activeView === "student-list" && (
          <>
            {showForm && <Form />}
            <CoursesView />
            <StudentProfile />
          </>
        )}
        {activeView === "table-view" && <TableView />}
      </Main>
    </div>
  );
}
