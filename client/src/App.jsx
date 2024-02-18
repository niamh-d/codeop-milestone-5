import "./App.css";

import Header from "./components/Header";
import Main from "./components/Main";
import CoursesView from "./components/views/CoursesView";
import TableView from "./components/views/TableView";

import { useStudents } from "./contexts/StudentsContext";

export default function App() {
  const { activeView } = useStudents();

  return (
    <div className="app">
      <Header />
      <Main>
        {activeView === "courses-list" && <CoursesView />}
        {activeView === "table-view" && <TableView />}
      </Main>
    </div>
  );
}
